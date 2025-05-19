import type { ButtonHTMLAttributes, FormEvent } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  hidden: boolean;
  className?: string;
  onClick?: (e: FormEvent<HTMLButtonElement>) => Promise<void> | void;
}

export const ThemedButton = ({
  children,
  variant,
  hidden,
  className,
  onClick,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      className={`p-2 pb-3 w-full lg:mt-0  text-center cursor-pointer  ${
        variant === 'primary'
          ? 'hover:bg-blue-400 text-white bg-blue-500 mt-4'
          : 'hover:bg-white/30 bg-white/20 '
      } ${
        hidden ? 'lg:hidden' : ''
      }  rounded-md disabled:opacity-30  transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
