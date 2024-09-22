import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function MockPageSkeleton() {
	return (
		<div className="flex-1 flex flex-col w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] mt-20 mb-6 sm:mb-20 bg-glass bg-glass-gradient backdrop-blur-3xl rounded-xl border border-primary px-4 sm:px-6 lg:px-8 py-6">
			<div className="flex flex-col sm:flex-row justify-between">
				<div className="flex flex-1 flex-col">
					<Skeleton className="h-6 w-2/3 sm:h-8 sm:w-1/3 bg-muted bg-purple-800/60" />
					<Skeleton className="h-3 w-1/2 sm:h-4 sm:w-1/4 mt-2 bg-muted bg-purple-800/60" />
				</div>
				<div className="mt-4 sm:mt-0 ">
					<Button
						disabled
						variant="outline"
						className="bg-card/50 gap-2 text-primary font-medium border-primary text-muted-foreground hover:bg-card w-full sm:w-72 justify-start "
					>
						<Clipboard size={20} className="stroke-white" />
						<Skeleton className="h-3 w-full sm:h-4  bg-muted bg-purple-800/60" />
					</Button>
				</div>
			</div>
			<Skeleton className="mt-4 h-64 sm:h-full bg-muted rounded-md bg-purple-800/60" />
		</div>
	);
}
