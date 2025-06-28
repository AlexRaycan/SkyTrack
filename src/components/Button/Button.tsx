import { type ButtonHTMLAttributes, memo, type ReactElement, useMemo } from 'react';
import { cn } from '@/helpers/classNames.ts';
import './Button.css';

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
				'bg-background hover:bg-background-hover active:bg-background-active inline-flex w-full flex-col items-center justify-center gap-2 px-4 py-6',
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
