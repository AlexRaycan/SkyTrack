import { type ButtonHTMLAttributes, memo, type ReactElement, useMemo } from 'react';
import { cn } from '@/helpers/classNames.ts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactElement;
}

const Button = memo(function Button({ ...props }: ButtonProps) {
	const { icon, className, type = 'button', children, ...otherProps } = props;

	const isText = useMemo(() => !!children, [children]);
	const isIconOnly = useMemo(() => icon && !isText, [icon, isText]);
	const isFullButton = useMemo(() => icon && isText, [icon, isText]);

	return (
		<button
			type={type}
			aria-label="Button"
			className={cn(
				'inline-flex w-full flex-col items-center justify-center gap-2 bg-[var(--color-primary)] px-4 py-6 hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]',
				!isFullButton && 'w-auto',
				isIconOnly && 'h-10 w-10 rounded-full p-0',
				className,
			)}
			{...otherProps}
		>
			{icon}
			{children}
		</button>
	);
});

export default Button;
