import { useState } from "react";
import { useRevalidator } from "react-router";
import { Plus, CheckCircle, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { FileUploadZone } from "./ui/file-upload-zone";
import type { NewResource } from "../lib/types";
import { useAuth } from "~/contexts/AuthContext";
import { LoginPrompt } from "./login-prompt";

export function AddResourcePanel() {
	const revalidator = useRevalidator();
	const { accessToken, isAuthenticated } = useAuth();
	const [formData, setFormData] = useState<NewResource>({
		title: "",
		sourceUrl: "",
		file: undefined,
		authors: "",
		publishDate: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

	const validateUrl = (url: string): boolean => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		} else if (formData.title.length > 200) {
			newErrors.title = "Title must be less than 200 characters";
		}

		if (!formData.sourceUrl.trim()) {
			newErrors.sourceUrl = "Source URL is required";
		} else if (!validateUrl(formData.sourceUrl)) {
			newErrors.sourceUrl = "Please enter a valid URL";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const uploadWithProgress = (formDataToSend: FormData): Promise<Response> => {
		return new Promise((resolve, reject) => {
			// Check if we have an access token
			if (!accessToken) {
				reject(new Error("Not authenticated. Please sign in first."));
				return;
			}

			const xhr = new XMLHttpRequest();

			xhr.upload.addEventListener("progress", (e) => {
				if (e.lengthComputable) {
					const percentage = Math.round((e.loaded / e.total) * 100);
					setUploadProgress(percentage);
				}
			});

			xhr.addEventListener("load", () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(new Response(xhr.response, { status: xhr.status }));
				} else {
					reject(new Error(xhr.statusText || "Upload failed"));
				}
			});

			xhr.addEventListener("error", () => {
				reject(new Error("Network error occurred"));
			});

			xhr.addEventListener("abort", () => {
				reject(new Error("Upload aborted"));
			});

			xhr.open("POST", "/api/upload");
			// Add Authorization header with the Google OAuth token
			xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
			xhr.send(formDataToSend);
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);
		setUploadProgress(0);
		setErrors({});

		try {
			const formDataToSend = new FormData();
			formDataToSend.append("title", formData.title);
			formDataToSend.append("sourceUrl", formData.sourceUrl);
			if (formData.authors) formDataToSend.append("authors", formData.authors);
			if (formData.publishDate)
				formDataToSend.append("publishDate", formData.publishDate);
			if (formData.file) formDataToSend.append("file", formData.file);

			const response = await uploadWithProgress(formDataToSend);

			if (!response.ok) {
				const errorData = (await response.json()) as { error?: string };
				throw new Error(errorData.error || "Upload failed");
			}

			const result = await response.json();
			console.log("Upload successful:", result);
			setShowSuccess(true);
			setUploadProgress(100);

			// Revalidate to refresh the papers list
			revalidator.revalidate();

			// Reset form after 3 seconds
			setTimeout(() => {
				setFormData({
					title: "",
					sourceUrl: "",
					file: undefined,
					authors: "",
					publishDate: "",
				});
				setShowSuccess(false);
				setUploadProgress(0);
			}, 3000);
		} catch (error) {
			console.error("Upload error:", error);
			setErrors({
				submit: error instanceof Error ? error.message : "Upload failed",
			});
			setUploadProgress(0);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleFileSelect = (file: File | null) => {
		setFormData({ ...formData, file: file || undefined });
	};

	const isFormValid = formData.title.trim() && formData.sourceUrl.trim();

	// Show login prompt if user is not authenticated
	if (!isAuthenticated) {
		return <LoginPrompt />;
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-xl flex items-center gap-2">
					<Plus className="h-5 w-5" />
					Add New Resource
				</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Title Field */}
					<div className="space-y-2">
						<Label htmlFor="title">
							Title <span className="text-[#ea580c]">*</span>
						</Label>
						<Input
							id="title"
							type="text"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
							placeholder="Enter paper title"
							className={errors.title ? "border-red-500" : ""}
							maxLength={200}
						/>
						{errors.title && (
							<p className="text-sm text-red-600">{errors.title}</p>
						)}
					</div>

					{/* Source URL Field */}
					<div className="space-y-2">
						<Label htmlFor="sourceUrl">
							Source URL <span className="text-[#ea580c]">*</span>
						</Label>
						<Input
							id="sourceUrl"
							type="url"
							value={formData.sourceUrl}
							onChange={(e) =>
								setFormData({ ...formData, sourceUrl: e.target.value })
							}
							placeholder="https://example.com/paper.pdf"
							className={errors.sourceUrl ? "border-red-500" : ""}
						/>
						{errors.sourceUrl && (
							<p className="text-sm text-red-600">{errors.sourceUrl}</p>
						)}
					</div>

					{/* File Upload */}
					<div className="space-y-2">
						<Label>Upload PDF (Optional)</Label>
						<FileUploadZone
							onFileSelect={handleFileSelect}
							selectedFile={formData.file || null}
							maxSizeMB={50}
						/>
					</div>

					{/* Authors Field */}
					<div className="space-y-2">
						<Label htmlFor="authors">Authors (Optional)</Label>
						<Input
							id="authors"
							type="text"
							value={formData.authors}
							onChange={(e) =>
								setFormData({ ...formData, authors: e.target.value })
							}
							placeholder="e.g., Smith, J., Doe, A."
						/>
						<p className="text-xs text-[#78716c]">
							Enter author names separated by commas
						</p>
					</div>

					{/* Publish Date Field */}
					<div className="space-y-2">
						<Label htmlFor="publishDate">Publish Date (Optional)</Label>
						<Input
							id="publishDate"
							type="text"
							value={formData.publishDate}
							onChange={(e) =>
								setFormData({ ...formData, publishDate: e.target.value })
							}
							placeholder="e.g., January 2024"
						/>
						<p className="text-xs text-[#78716c]">
							Enter the publication date in any format
						</p>
					</div>

					{/* Submit Button */}
					<Button
						type="submit"
						disabled={!isFormValid || isSubmitting}
						className="w-full gap-2"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Uploading...
							</>
						) : (
							<>
								<Plus className="h-4 w-4" />
								Submit Resource
							</>
						)}
					</Button>

					{/* Upload Progress */}
					{isSubmitting && uploadProgress > 0 && (
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-[#78716c]">Upload Progress</span>
								<span className="font-medium text-[#ea580c]">
									{uploadProgress}%
								</span>
							</div>
							<Progress value={uploadProgress} />
						</div>
					)}

					{/* Error Message */}
					{errors.submit && (
						<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
							<p className="text-sm text-red-600">{errors.submit}</p>
						</div>
					)}

					{/* Success Message */}
					{showSuccess && (
						<div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<div className="flex-1">
								<p className="text-sm font-medium text-green-900">
									Resource added successfully!
								</p>
								<p className="text-xs text-green-700">
									Your paper has been added to the library.
								</p>
							</div>
							<button
								type="button"
								onClick={() => setShowSuccess(false)}
								className="text-green-600 hover:text-green-800"
							>
								<X className="h-4 w-4" />
							</button>
						</div>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
