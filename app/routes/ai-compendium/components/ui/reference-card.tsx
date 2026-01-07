import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import type { ResearchPaper } from "../../lib/types";

interface ReferenceCardProps {
	paper: ResearchPaper;
	index: number;
}

export function ReferenceCard({ paper, index }: ReferenceCardProps) {
	return (
		<Card className="border-l-4 border-l-[#ea580c]">
			<CardContent className="pt-4">
				<a
					href={paper.sourceUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="group"
				>
					<div className="flex items-start gap-2">
						<span className="text-sm font-bold text-[#ea580c] shrink-0">
							[{index}]
						</span>
						<div className="flex-1 min-w-0">
							<h4 className="text-sm font-medium group-hover:text-[#ea580c] transition-colors line-clamp-2">
								{paper.title}
							</h4>
							<p className="text-xs text-[#78716c] mt-1">
								Published: {paper.publishDate}
							</p>
							{paper.authors && (
								<p className="text-xs text-[#78716c] mt-0.5">
									{paper.authors}
								</p>
							)}
						</div>
						<ExternalLink className="h-4 w-4 text-[#78716c] group-hover:text-[#ea580c] transition-colors shrink-0" />
					</div>
				</a>
			</CardContent>
		</Card>
	);
}
