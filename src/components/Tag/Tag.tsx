import { memo } from 'react';
import { cn } from '@/helpers/classNames';

interface TagProps {
	className?: string;
	label: string;
}

const Tag = memo(function Tag({ ...props }: TagProps) {
	const { className, label } = props;

	return (
		<span
			className={cn(
				'text-muted-foreground bg-muted inline-flex justify-center gap-3 rounded-full px-3 py-2',
				className,
			)}
		>
			{label}
		</span>
	);
});

export default Tag;
