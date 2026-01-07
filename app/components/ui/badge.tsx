import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:ring-offset-2",
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-[#ea580c] text-white hover:bg-[#c2410c]",
				secondary:
					"border-transparent bg-[#fff7ed] text-[#ea580c] hover:bg-[#fed7aa]",
				outline: "text-foreground border-[#fed7aa]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
