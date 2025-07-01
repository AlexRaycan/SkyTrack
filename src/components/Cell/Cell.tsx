import { memo, type PropsWithChildren, type ReactElement } from 'react';
import { cn } from '@/lib/utils.ts';

export interface CellProps extends PropsWithChildren {
	className?: string;
	isBG?: boolean;
	isColumn?: boolean;
	gap?: number;
	isBetween?: boolean;
	isCentered?: boolean;
	header?: ReactElement;
	isInteractive?: boolean;
	isButton?: boolean;
}

const Cell = memo(function Cell({ ...props }: CellProps) {
	const { className, children, isBG, isColumn, gap, isBetween, isCentered, header, isInteractive = true } = props;

	return (
		<div
			className={cn(
				className,
				'flex w-full flex-1 items-stretch justify-center gap-1 p-0',
				isCentered && 'justify-center',
				isBetween && 'justify-between',
				gap && `gap-${gap}`,
				isColumn && 'flex-col items-center justify-stretch',
				isBG && 'bg-background px-3 py-4 md:px-4 md:py-6',
				header && 'bg-popover justify-start p-4 text-left',
				isInteractive && 'hover:bg-background-hover active:bg-background-active',
			)}
		>
			{header}
			{children}
		</div>
	);
});

export default Cell;
