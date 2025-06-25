import { type ButtonHTMLAttributes, memo, type ReactElement, useMemo } from 'react';
import { cn } from '@/helpers/classNames.ts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactElement;
}

const Button = memo(function Button({ ...props }: ButtonProps) {
	const { icon, className, type = 'button', children, ...otherProps } = props;

	const isIcon = useMemo(() => !!icon, [icon]);
	const isText = useMemo(() => !!children, [children]);
	const isIconOnly = useMemo(() => isIcon && !isText, [isIcon, isText]);
	const isFullButton = useMemo(() => isIcon && isText, [isIcon, isText]);

	return (
		<button
			type={type}
			className={cn(
				className,
				'inline-flex flex-col items-center justify-center gap-2 bg-[var(--color-gray-bg)]',
				isIconOnly && 'h-10 w-10 rounded-full',
				isFullButton && 'w-full px-4 py-6',
			)}
			{...otherProps}
		>
			{isIcon && icon}
			{isText && children}
		</button>
	);
});

export default Button;
