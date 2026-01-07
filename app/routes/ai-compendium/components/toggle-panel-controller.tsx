import { Search, Library, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { PanelType } from "../lib/types";

interface TogglePanelControllerProps {
	activePanel: PanelType;
	onPanelChange: (panel: PanelType) => void;
}

export function TogglePanelController({
	activePanel,
	onPanelChange,
}: TogglePanelControllerProps) {
	return (
		<div className="flex flex-wrap gap-2 justify-center sm:justify-end">
			<Button
				variant={activePanel === "ask" ? "default" : "outline"}
				size="default"
				onClick={() => onPanelChange("ask")}
				className="gap-2"
			>
				<Search className="h-4 w-4" />
				Ask
			</Button>
			<Button
				variant={activePanel === "library" ? "default" : "outline"}
				size="default"
				onClick={() => onPanelChange("library")}
				className="gap-2"
			>
				<Library className="h-4 w-4" />
				Library
			</Button>
			<Button
				variant={activePanel === "add" ? "default" : "outline"}
				size="default"
				onClick={() => onPanelChange("add")}
				className="gap-2"
			>
				<Plus className="h-4 w-4" />
				Add Resource
			</Button>
		</div>
	);
}
