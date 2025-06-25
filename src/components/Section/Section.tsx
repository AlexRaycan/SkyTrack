import { memo, type PropsWithChildren } from 'react';
import { cn } from '@/helpers/classNames.ts';

interface SectionProps extends PropsWithChildren {
	className?: string;
}

const Section = memo(function Section({ ...props }: SectionProps) {
	const { className, children } = props;

	return (
		<section className={cn(className, 'inline-flex w-full flex-col gap-1 overflow-hidden rounded-3xl')}>
			{children}
		</section>
	);
});

export default Section;
