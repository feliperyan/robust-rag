import { useState } from "react";
import type { Route } from "./+types/ai-compendium";
import { TogglePanelController } from "./ai-compendium/components/toggle-panel-controller";
import { AskQuestionPanel } from "./ai-compendium/components/ask-question-panel";
import { LibraryPanel } from "./ai-compendium/components/library-panel";
import { AddResourcePanel } from "./ai-compendium/components/add-resource-panel";
import { researchPapers, searchQueries } from "./ai-compendium/lib/dummy-data";
import type { PanelType } from "./ai-compendium/lib/types";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "AI Compendium" },
		{
			name: "description",
			content: "AI Compendium - Your guide to AI models and providers",
		},
	];
}

export default function AICompendium() {
	const [activePanel, setActivePanel] = useState<PanelType>("ask");

	return (
		<div className="min-h-screen bg-white">
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				{/* Header */}
				<header className="mb-8">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
						<div>
							<h1 className="text-4xl font-bold text-[#ea580c] mb-2">
								AI Compendium
							</h1>
							<p className="text-[#78716c]">
								Explore AI research papers and discover insights
							</p>
						</div>
						<TogglePanelController
							activePanel={activePanel}
							onPanelChange={setActivePanel}
						/>
					</div>
					<div className="h-1 bg-gradient-to-r from-[#ea580c] to-[#fed7aa] rounded-full" />
				</header>

				{/* Panel Container */}
				<div className="relative">
					{/* Panel transitions */}
					<div
						className={`transition-all duration-300 ${
							activePanel === "ask"
								? "opacity-100 translate-y-0"
								: "opacity-0 absolute inset-0 pointer-events-none translate-y-4"
						}`}
					>
						{activePanel === "ask" && (
							<AskQuestionPanel
								searchQueries={searchQueries}
								papers={researchPapers}
							/>
						)}
					</div>

					<div
						className={`transition-all duration-300 ${
							activePanel === "library"
								? "opacity-100 translate-y-0"
								: "opacity-0 absolute inset-0 pointer-events-none translate-y-4"
						}`}
					>
						{activePanel === "library" && (
							<LibraryPanel papers={researchPapers} />
						)}
					</div>

					<div
						className={`transition-all duration-300 ${
							activePanel === "add"
								? "opacity-100 translate-y-0"
								: "opacity-0 absolute inset-0 pointer-events-none translate-y-4"
						}`}
					>
						{activePanel === "add" && <AddResourcePanel />}
					</div>
				</div>

				{/* Footer */}
				<footer className="mt-16 pt-8 border-t border-[#fed7aa]">
					<p className="text-center text-sm text-[#78716c]">
						AI Compendium - A curated collection of AI research papers
					</p>
				</footer>
			</div>
		</div>
	);
}
