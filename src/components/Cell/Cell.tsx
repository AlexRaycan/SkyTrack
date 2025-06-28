import { memo, type PropsWithChildren, type ReactElement } from 'react';
import { cn } from '@/helpers/classNames';

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
				'inline-flex w-full items-center gap-1',
				isCentered && 'justify-center',
				isBetween && 'justify-between',
				gap && `gap-${gap}`,
				isColumn && 'flex-col',
				isBG && 'bg-[var(--color-primary)] px-4 py-6',
				header && 'justify-start bg-[var(--color-gray-bg)] p-4 text-left',
				isInteractive && 'hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]',
				className,
			)}
		>
			{header}
			{children}
		</div>
	);
});

export default Cell;
