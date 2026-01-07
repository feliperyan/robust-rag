import { Card, CardContent } from "~/components/ui/card";
import { ReferenceCard } from "./reference-card";
import type { ResearchPaper } from "../../lib/types";

interface SearchResultsProps {
	answer: string;
	referencePapers: ResearchPaper[];
}

export function SearchResults({ answer, referencePapers }: SearchResultsProps) {
	return (
		<div className="space-y-6 mt-6">
			{/* Textual Answer Section */}
			<Card>
				<CardContent className="pt-6">
					<div className="prose prose-sm max-w-none">
						{answer.split("\n\n").map((paragraph, index) => (
							<p key={index} className="text-sm leading-relaxed mb-4 last:mb-0">
								{paragraph}
							</p>
						))}
					</div>
				</CardContent>
			</Card>

			{/* References Section */}
			{referencePapers.length > 0 && (
				<div>
					<h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
						<span>📚</span>
						References
					</h3>
					<div className="space-y-3">
						{referencePapers.map((paper, index) => (
							<ReferenceCard
								key={paper.id}
								paper={paper}
								index={index + 1}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
