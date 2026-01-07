export interface ResearchPaper {
	id: string;
	title: string;
	publishDate: string;
	authors: string;
	sourceUrl: string;
	abstract?: string;
}

export interface SearchQuery {
	query: string;
	answer: string;
	references: string[]; // Array of paper IDs
}

export interface NewResource {
	title: string;
	sourceUrl: string;
	file?: File;
	authors?: string;
	publishDate?: string;
}

export type PanelType = "ask" | "library" | "add";
