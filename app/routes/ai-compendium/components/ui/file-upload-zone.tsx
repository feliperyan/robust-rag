import { useState, useRef } from "react";
import { FileText, Upload, X } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

interface FileUploadZoneProps {
	onFileSelect: (file: File | null) => void;
	selectedFile: File | null;
	maxSizeMB?: number;
}

export function FileUploadZone({
	onFileSelect,
	selectedFile,
	maxSizeMB = 50,
}: FileUploadZoneProps) {
	const [isDragging, setIsDragging] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const validateFile = (file: File): boolean => {
		// Check file type
		if (file.type !== "application/pdf") {
			setError("Only PDF files are allowed");
			return false;
		}

		// Check file size (convert MB to bytes)
		const maxSizeBytes = maxSizeMB * 1024 * 1024;
		if (file.size > maxSizeBytes) {
			setError(`File size must be less than ${maxSizeMB}MB`);
			return false;
		}

		setError(null);
		return true;
	};

	const handleFileSelect = (file: File) => {
		if (validateFile(file)) {
			onFileSelect(file);
		} else {
			onFileSelect(null);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);

		const files = e.dataTransfer.files;
		if (files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			handleFileSelect(files[0]);
		}
	};

	const handleRemoveFile = () => {
		onFileSelect(null);
		setError(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="space-y-2">
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClick}
				className={cn(
					"border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
					isDragging
						? "border-[#ea580c] bg-[#fff7ed]"
						: "border-[#e7e5e4] hover:border-[#fed7aa] hover:bg-[#fff7ed]/50",
					error && "border-red-300 bg-red-50"
				)}
			>
				<input
					ref={fileInputRef}
					type="file"
					accept=".pdf,application/pdf"
					onChange={handleInputChange}
					className="hidden"
				/>

				<div className="flex flex-col items-center gap-3">
					{selectedFile ? (
						<FileText className="h-12 w-12 text-[#ea580c]" />
					) : (
						<Upload className="h-12 w-12 text-[#78716c]" />
					)}

					{selectedFile ? (
						<div className="space-y-1">
							<p className="text-sm font-medium text-[#ea580c]">
								{selectedFile.name}
							</p>
							<p className="text-xs text-[#78716c]">
								{(selectedFile.size / 1024 / 1024).toFixed(2)} MB
							</p>
						</div>
					) : (
						<div className="space-y-1">
							<p className="text-sm font-medium">
								Drop PDF here or click to select
							</p>
							<p className="text-xs text-[#78716c]">
								Maximum file size: {maxSizeMB}MB
							</p>
						</div>
					)}
				</div>
			</div>

			{selectedFile && (
				<div className="flex items-center justify-between p-2 bg-[#fff7ed] rounded-md">
					<span className="text-sm text-[#ea580c] truncate flex-1">
						{selectedFile.name}
					</span>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={(e) => {
							e.stopPropagation();
							handleRemoveFile();
						}}
						className="h-6 w-6 p-0"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>
			)}

			{error && (
				<p className="text-sm text-red-600">{error}</p>
			)}
		</div>
	);
}
