import { cn } from '@/lib/utils';

interface SkeletonProps {
	className?: string;
}

const Skeleton = (props: SkeletonProps) => {
	const { className } = props;

	return (
		<div className={cn('w-full rounded-3xl bg-transparent p-1', 'transition-all duration-200', className)}>
			<div
				className={cn(
					'bg-background relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl p-5',
					'transition-all duration-200',
				)}
			>
				<div className={cn('bg-background-active absolute inset-0 z-30 animate-pulse', className)} />
			</div>
		</div>
	);
};

export default Skeleton;
