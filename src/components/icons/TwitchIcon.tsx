interface Props {
  width: number;
  height: number;
  className?: string;
}
export const TwitchIcon = ({ width, height, className }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2.54689 1L1 4.77575V20.2087H6.49952V23H9.5933L12.5153 20.2087H16.9842L23 14.4622V1H2.54689V1ZM20.9368 13.4777L17.4995 16.7612H12L9.07799 19.5524V16.7612H4.43732V2.96992H20.9368V13.4777ZM17.4995 6.74658V12.4868H15.4373V6.74658H17.4995ZM12 6.74658V12.4868H9.9378V6.74658H12Z'
        fill='#fff'
      />
    </svg>
  );
};
