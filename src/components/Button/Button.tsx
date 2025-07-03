import { type ButtonHTMLAttributes, memo, type ReactElement, useMemo } from 'react';
import { cn } from '@/lib/utils.ts';
import './Button.css';
import { AnimateIcon } from '@components/animate-ui/icons/icon.tsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactElement | null;
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
					!isIconOnly && 'button-icon',
					'bg-background hover:bg-background-hover hover:text-accent active:text-accent md:active:bg-background-active inline-flex w-full items-center justify-center gap-2 transition-all duration-200',
					'text-sm md:text-base',
					!isHorizontal && 'flex-col',
					size === 'large' && 'px-3 py-3 md:px-4 md:py-4',
					size === 'medium' && 'px-1.5 py-2 text-sm md:px-3 md:py-4',
					size === 'small' && 'px-1 py-1.5 text-xs md:px-2 md:py-3',
					!isFullButton && 'w-auto',
					isIconOnly && 'aspect-square rounded-full p-3 md:p-4',
					isIconOnly && size === 'large' && 'h-12 w-12 md:h-16 md:w-16',
					isIconOnly && size === 'medium' && 'h-6 w-6 md:h-12 md:w-12',
					isIconOnly && size === 'small' && 'h-5 w-5 md:h-10 md:w-10',
					isTransparent && 'bg-transparent p-0 hover:bg-transparent md:p-0',
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
