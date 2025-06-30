import { type ButtonHTMLAttributes, memo, type ReactElement, useMemo } from 'react';
import { cn } from '@/lib/utils.ts';
import './Button.css';
import { AnimateIcon } from '@components/animate-ui/icons/icon.tsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactElement;
	size?: 'small' | 'medium' | 'large';
	isHorizontal?: boolean;
	isTransparent?: boolean;
	isActive?: boolean;
}

const Button = memo(function Button({ ...props }: ButtonProps) {
	const {
		icon,
		className,
		type = 'button',
		size = 'large',
		isHorizontal = false,
		isTransparent = false,
		children,
		...otherProps
	} = props;

	const isText = useMemo(() => !!children, [children]);
	const isIconOnly = useMemo(() => icon && !isText, [icon, isText]);
	const isFullButton = useMemo(() => icon && isText, [icon, isText]);

	return (
		<AnimateIcon
			animateOnHover
			animateOnTap
		>
			<button
				type={type}
				aria-label="Button"
				className={cn(
					'bg-background hover:bg-background-hover hover:text-accent active:bg-background-active inline-flex w-full items-center justify-center gap-2 transition-all duration-200',
					!isHorizontal && 'flex-col',
					size === 'large' && 'px-6 py-8',
					size === 'medium' && 'px-3 py-4 text-sm',
					size === 'small' && 'px-2 py-3 text-xs',
					!isFullButton && 'w-auto',
					isIconOnly && 'aspect-square rounded-full p-0',
					isIconOnly && size === 'large' && 'w-16',
					isIconOnly && size === 'medium' && 'w-12',
					isIconOnly && size === 'small' && 'w-10',
					isTransparent && 'bg-transparent',
					className,
				)}
				{...otherProps}
			>
				{icon}
				{children}
			</button>
		</AnimateIcon>
	);
});

export default Button;
