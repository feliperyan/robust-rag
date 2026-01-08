export interface ResearchPaper {
	id: string;
	title: string;
	publishDate: string;
	authors: string;
	sourceUrl: string;
	filename?: string;
	uploadedAt?: string;
	fileSize?: number;
	abstract?: string;
}

export interface SearchResultContent {
	id: string;
	type: string;
	text: string;
}

export interface SearchResultData {
	file_id: string;
	filename: string;
	score: number;
	attributes: {
		modified_date: number;
		folder: string;
	};
	content: SearchResultContent[];
}

export interface SearchQuery {
	object: string;
	search_query: string;
	response: string;
	data: SearchResultData[];
	has_more: boolean;
	next_page: string | null;
	papers?: ResearchPaper[];
}

export interface NewResource {
	title: string;
	sourceUrl: string;
	file?: File;
	authors?: string;
	publishDate?: string;
}

export type PanelType = "ask" | "library" | "add";
