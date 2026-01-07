import { ExternalLink, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import type { ResearchPaper } from "../../lib/types";

interface PaperCardProps {
	paper: ResearchPaper;
}

export function PaperCard({ paper }: PaperCardProps) {
	return (
		<Card className="h-full flex flex-col hover:border-[#ea580c] hover:shadow-md transition-all duration-200">
			<CardHeader className="pb-3">
				<CardTitle className="text-base leading-tight line-clamp-2">
					{paper.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1 pb-3">
				<div className="flex items-center gap-2 text-sm text-[#78716c]">
					<Calendar className="h-4 w-4" />
					<span>{paper.publishDate}</span>
				</div>
				{paper.authors && (
					<p className="text-sm text-[#78716c] mt-2 line-clamp-1">
						{paper.authors}
					</p>
				)}
				{paper.fileSize && (
					<p className="text-xs text-[#a8a29e] mt-1">
						{(paper.fileSize / 1024 / 1024).toFixed(2)} MB
					</p>
				)}
			</CardContent>
			<CardFooter className="pt-0 flex flex-col gap-2 items-start">
				{paper.filename && (
					<a
						href={`/api/files/${paper.filename}`}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-[#ea580c] hover:text-[#c2410c] font-medium flex items-center gap-1 hover:underline"
					>
						<FileText className="h-3 w-3" />
						Download PDF
					</a>
				)}
				<a
					href={paper.sourceUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-[#ea580c] hover:text-[#c2410c] font-medium flex items-center gap-1 hover:underline"
				>
					View Source
					<ExternalLink className="h-3 w-3" />
				</a>
			</CardFooter>
		</Card>
	);
}
