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

	const handleSearch = () => {
		if (!query.trim()) return;

		setIsLoading(true);
		setCurrentResult(null);

		// Simulate API call delay
		setTimeout(() => {
			// Find matching query (case-insensitive partial match)
			const result = searchQueries.find((sq) =>
				sq.query.toLowerCase().includes(query.toLowerCase()) ||
				query.toLowerCase().includes(sq.query.toLowerCase())
			);

			setCurrentResult(result || null);
			setIsLoading(false);
		}, 1000);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	// Get referenced papers for current result
	const referencePapers = currentResult
		? currentResult.references
				.map((refId) => papers.find((p) => p.id === refId))
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
						onKeyPress={handleKeyPress}
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
				{!isLoading && !currentResult && query && (
					<div className="mt-6 text-center py-8 text-[#78716c]">
						<p>No results found for "{query}"</p>
						<p className="text-sm mt-2">
							Try: "What are transformer models?", "How does attention
							work?", or "BERT vs GPT"
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
						answer={currentResult.answer}
						referencePapers={referencePapers}
					/>
				)}
			</CardContent>
		</Card>
	);
}
