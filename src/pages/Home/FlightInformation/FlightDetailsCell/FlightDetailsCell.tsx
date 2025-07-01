import { memo, type ReactElement, useMemo } from 'react';
import { cn } from '@/lib/utils.ts';
import type { CellProps } from '@components/Cell/Cell.tsx';

interface FICellProps extends CellProps {
	title?: string | number | ReactElement;
	isTitleHidden?: boolean;
	value?: string | number | ReactElement;
	alignment?: 'left' | 'right' | 'center';
}

const FlightDetailsCell = memo(function FICell({ ...props }: FICellProps) {
	const { className, children, title, value, isTitleHidden, alignment = 'left', ...otherProps } = props;

	const titleElement = useMemo(() => {
		if (typeof title === 'string' || typeof title === 'number') {
			return (
				<h5
					hidden={isTitleHidden}
					className={cn('text-muted-foreground')}
				>
					{title}
				</h5>
			);
		}

		return title;
	}, [isTitleHidden, title]);

	const valueElement = useMemo(() => {
		if (typeof value === 'string' || typeof value === 'number') {
			return <span>{value}</span>;
		}

		return value;
	}, [value]);

	return (
		<div
			className={cn(
				className,
				'inline-flex w-full flex-1 flex-col items-start justify-center gap-2.5',
				alignment === 'right' && 'items-end',
				alignment === 'center' && 'items-center',
				'bg-background px-3 py-4',
				'hover:bg-background-hover active:bg-background-active transition-colors',
				'md:flex-row md:justify-between md:gap-2 md:px-4 md:py-6',
				title && !value && 'md:justify-start',
			)}
			{...otherProps}
		>
			{title && titleElement}
			{value && valueElement}
			{children}
		</div>
	);
});

export default FlightDetailsCell;
