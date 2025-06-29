import { memo, type PropsWithChildren, type ReactElement } from 'react';
import { cn } from '@/helpers/classNames.ts';
import Cell from '@components/Cell';

interface SectionProps extends PropsWithChildren {
	className?: string;
	header?: ReactElement;
	isColumn?: boolean;
}

const Section = memo(function Section({ ...props }: SectionProps) {
	const { className, children, header, isColumn } = props;

	return (
		<section>
			<div
				className={cn(
					className,
					'inline-flex w-full gap-1 overflow-hidden rounded-3xl',
					isColumn && 'flex-col',
				)}
			>
				{header && (
					<Cell
						header={header}
						isBG
						isInteractive={false}
					/>
				)}
				{children}
			</div>
		</section>
	);
});

export default Section;
