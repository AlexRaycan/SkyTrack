import { cn } from '@/lib/utils';

interface SkeletonProps {
	className?: string;
}

const Skeleton = (props: SkeletonProps) => {
	const { className } = props;

	return <div className={cn('bg-background-active absolute inset-0 z-30 animate-pulse', className)} />;
};

export default Skeleton;
