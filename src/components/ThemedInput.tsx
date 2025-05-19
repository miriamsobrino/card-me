import type { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ThemedInput = ({ id, placeholder, value, onChange }: Props) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className=' border-white/20 border-2 rounded-md p-2 outline-none w-full focus:border-white/40'
    />
  );
};
