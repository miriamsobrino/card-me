import { MdEdit } from 'react-icons/md';
interface Props {
  imagePreview: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader = ({ imagePreview, handleFileChange }: Props) => {
  return (
    <div className='lg:w-36 lg:h-36 w-28 h-28 rounded-full overflow-hidden relative cursor-pointer group'>
      <img
        src={imagePreview}
        className='w-full h-full aspect-square rounded-full opacity-90 object-cover'
      />
      <div className='w-full h-full bg-transparent group-hover:bg-black/40 absolute inset-0 transition-all duration-200 flex items-center justify-center'>
        <input
          type='file'
          accept='image/*'
          className='absolute inset-0 w-36 h-36 opacity-0 cursor-pointer z-20'
          onChange={handleFileChange}
        />
        <MdEdit
          size={40}
          className='opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 duration-200 transition-all z--1'
        />
      </div>
    </div>
  );
};
