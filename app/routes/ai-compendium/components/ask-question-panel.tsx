import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { SearchResults } from "./ui/search-results";
import type { ResearchPaper, SearchQuery } from "../lib/types";

interface AskQuestionPanelProps {
	searchQueries: SearchQuery[];
	papers: ResearchPaper[];
}

export function AskQuestionPanel({
	searchQueries,
	papers,
}: AskQuestionPanelProps) {
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [currentResult, setCurrentResult] = useState<SearchQuery | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async () => {
		if (!query.trim()) return;

		setIsLoading(true);
		setCurrentResult(null);
		setError(null);

		try {
			const response = await fetch("/api/ai-search", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({})) as { error?: string };
				throw new Error(errorData.error || `API error: ${response.status}`);
			}

			const result = await response.json() as SearchQuery;
			setCurrentResult(result);
		} catch (err) {
			console.error("AI Search error:", err);
			const errorMessage = err instanceof Error ? err.message : "Failed to search. Please try again.";
			setError(errorMessage);
			setCurrentResult(null);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	// Get referenced papers for current result
	const referencePapers = currentResult?.papers
		? currentResult.data
				.map((item) => 
					currentResult.papers?.find((p) => p.filename === item.filename)
				)
				.filter((p): p is ResearchPaper => p !== undefined)
		: [];

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-xl flex items-center gap-2">
					<Search className="h-5 w-5" />
					Ask a Question
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2">
					<Input
						type="text"
						placeholder="e.g., What are transformer models?"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyUp={handleKeyPress}
						className="flex-1"
					/>
					<Button
						onClick={handleSearch}
						disabled={isLoading || !query.trim()}
						className="gap-2"
					>
						{isLoading ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Searching...
							</>
						) : (
							<>
								<Search className="h-4 w-4" />
								Ask
							</>
						)}
					</Button>
				</div>

				{/* Results Area */}
				{error && (
					<div className="mt-6 text-center py-8 text-red-600">
						<p className="font-semibold">Error</p>
						<p className="text-sm mt-2">{error}</p>
					</div>
				)}

				{!isLoading && !currentResult && !error && query && (
					<div className="mt-6 text-center py-8 text-[#78716c]">
						<p>No results found for "{query}"</p>
						<p className="text-sm mt-2">
							Try asking about AI research topics, models, and techniques
						</p>
					</div>
				)}

				{!isLoading && !currentResult && !query && (
					<div className="mt-6 text-center py-8 text-[#78716c]">
						<p className="text-lg">Enter a question to get started</p>
						<p className="text-sm mt-2">
							Ask about AI research topics, models, and techniques
						</p>
					</div>
				)}

				{currentResult && !isLoading && (
					<SearchResults
						answer={currentResult.response}
						referencePapers={referencePapers}
					/>
				)}
			</CardContent>
		</Card>
	);
}
