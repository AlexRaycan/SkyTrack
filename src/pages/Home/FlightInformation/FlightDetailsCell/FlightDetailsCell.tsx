import { memo, type ReactElement, useMemo } from 'react';
import { cn } from '@/lib/utils.ts';
import Cell from '@components/Cell';
import type { CellProps } from '@components/Cell/Cell.tsx';

interface FICellProps extends CellProps {
	title?: string | number | ReactElement;
	isTitleHidden?: boolean;
	value?: string | number | ReactElement;
}

const FlightDetailsCell = memo(function FICell({ ...props }: FICellProps) {
	const { className, children, title, value, isTitleHidden, ...otherProps } = props;

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
		<Cell
			isBG
			isBetween={!children}
			className={cn(className)}
			{...(children && { gap: 1 })}
			{...otherProps}
		>
			{title && titleElement}
			{value && valueElement}
			{children}
		</Cell>
	);
});

export default FlightDetailsCell;
