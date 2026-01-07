import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { PaperCard } from "./ui/paper-card";
import type { ResearchPaper } from "../lib/types";

interface LibraryPanelProps {
	papers: ResearchPaper[];
}

export function LibraryPanel({ papers }: LibraryPanelProps) {
	if (papers.length === 0) {
		return (
			<Card className="w-full">
				<CardHeader>
					<CardTitle className="text-xl flex items-center gap-2">
						Research Library
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-12 text-[#78716c]">
						<p className="text-lg">No papers yet</p>
						<p className="text-sm mt-2">
							Add your first research paper using the "Add Resource" panel
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-xl flex items-center gap-2">
					Research Library
				</CardTitle>
				<p className="text-sm text-[#78716c]">
					{papers.length} {papers.length === 1 ? "paper" : "papers"} in collection
				</p>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{papers.map((paper) => (
						<PaperCard key={paper.id} paper={paper} />
					))}
				</div>
			</CardContent>
		</Card>
	);
}
