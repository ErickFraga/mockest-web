import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function MockPageSkeleton() {
	return (
		<div className="flex-1 flex flex-col flex  w-[70svw] my-20 bg-glass bg-glass-gradient backdrop-blur-3xl rounded-xl border border-primary px-8 py-6">
			<div className="flex flex-grow justify-between">
				<div className="flex flex-1 flex flex-col">
					<Skeleton className="h-8 w-1/3 bg-muted bg-purple-800/60" />
					<Skeleton className="h-4 w-1/4 mt-2 bg-muted bg-purple-800/60" />
				</div>
				<Button
					disabled
					variant="outline"
					className="bg-card/50 gap-2 text-primary font-medium border-primary text-muted-foreground hover:bg-card "
				>
					<Clipboard size={16} className="stroke-white" />
					<Skeleton className="h-4 w-24 bg-muted bg-purple-800/60" />
				</Button>
			</div>
			<Skeleton className="mt-4 h-full bg-muted rounded-md bg-purple-800/60" />
		</div>
	);
}
