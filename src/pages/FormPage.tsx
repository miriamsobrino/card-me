import { PLATFORMS } from '../constants/constants';
import { CardPresentation } from '../components/CardPresentation';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { HexColorPicker } from 'react-colorful';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedInput } from '../components/ThemedInput';
import { useCardForm } from '../hooks/useCardForm';
import { ImageUploader } from '../components/ImageUploader';
import { useState } from 'react';

export default function FormPage() {
  const [selectedPlatform, setSelectedPlatform] = useState('');

  const [isMobile] = useState(window.innerWidth <= 768);
  const {
    name,
    profession,
    links,
    skills,
    portfolio,
    description,
    imagePreview,
    color,
    loading,
    cardData,
    errors,
    setName,
    setProfession,
    setPortfolio,
    setDescription,
    setColor,
    addSkill,
    addLink,
    deleteLink,
    deleteSkill,
    handleLinkChange,
    handleSkillChange,
    handleFileChange,
    handleSubmit,
  } = useCardForm();
  return (
    <div
      className='w-full h-full min-h-screen  justify-between text-white/60 items-start flex flex-col   '
      style={{ backgroundImage: `radial-gradient(${color}, #1a1a1a)` }}
    >
      {loading ? (
        <span className='loader'></span>
      ) : (
        <>
          <div className='lg:flex flex-col lg:flex-row items-center h-full  justify-between mt-24 lg:mb-10   lg:mt-40  w-full lg:px-70 '>
            <div className='text-center flex flex-col gap-4 items-center  w-full flex-1'>
              <ImageUploader
                imagePreview={imagePreview ? imagePreview : '/user.png'}
                handleFileChange={handleFileChange}
              />
              <h1 className='text-2xl font-bold  '>Introduce tu información</h1>
              <form
                className='flex flex-col items-start gap-3 w-[400px] pb-10 px-6 lg:px-0'
                onSubmit={handleSubmit}
              >
                {cardData && <label htmlFor='name'>Nombre</label>}

                <ThemedInput
                  id='name'
                  placeholder='Nombre'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                  <p className='text-sm text-red-400'>{errors.name}</p>
                )}
                {cardData && <label htmlFor='profession'>Profesión</label>}
                <ThemedInput
                  id='profession'
                  placeholder='Profesión'
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
                {errors.profession && (
                  <p className='text-sm text-red-400'>{errors.profession}</p>
                )}
                <label htmlFor='link' className='text-start'>
                  Links RRSS
                </label>

                <select
                  id='platform'
                  value={selectedPlatform}
                  className='border-white/20 border-2 rounded-md p-2 outline-none w-full focus:border-white/40'
                  onChange={(e) => {
                    addLink(e.target.value);
                    setSelectedPlatform(e.target.value);
                    setTimeout(() => setSelectedPlatform(''), 0);
                  }}
                >
                  <option value='' className='bg-gray-700'>
                    Selecciona una plataforma
                  </option>
                  {PLATFORMS.map((platform) => (
                    <option
                      key={platform}
                      value={platform}
                      className='bg-gray-800'
                      disabled={
                        links &&
                        links.some((link) => link.platform === platform)
                      }
                    >
                      {platform}
                    </option>
                  ))}
                </select>

                {links &&
                  links.map((link, index) => (
                    <div
                      key={index}
                      className='flex w-full justify-between group relative'
                    >
                      <ThemedInput
                        placeholder={`Enlace de ${link.platform}`}
                        value={link.url}
                        onChange={(e) =>
                          handleLinkChange(index, e.target.value)
                        }
                      />

                      <FaCircleMinus
                        className={`absolute right-2 top-4 cursor-pointer hover:opacity-100 hover:scale-[1.05] opacity-0 group-hover:opacity-80 transition-all duration-200 ${
                          isMobile ? 'opacity-100' : ''
                        }`}
                        onClick={() => deleteLink(index)}
                      />
                    </div>
                  ))}
                <label htmlFor='portfolio' className='text-start'>
                  Portfolio
                </label>
                <ThemedInput
                  id='portfolio'
                  placeholder='Enlace del portfolio'
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />

                <label htmlFor='description' className='text-start'>
                  Sobre ti
                </label>
                <textarea
                  id='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  className={` border-white/20 border-2 custom-scroll rounded-md p-2 outline-none w-full focus:border-white/40 ${
                    description ? 'min-h-30' : ''
                  }`}
                  maxLength={250}
                />
                {errors.description && (
                  <p className='text-sm text-red-400'>{errors.description}</p>
                )}
                <label htmlFor='skill' className='text-start'>
                  Habilidades (Tecnologías/Programas/Idiomas...)
                </label>
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className='flex w-full justify-between group relative'
                  >
                    <ThemedInput
                      id='skill'
                      placeholder={`Habilidad ${index + 1}`}
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                    />

                    <FaCircleMinus
                      className={`absolute right-2 top-4 cursor-pointer hover:opacity-100 hover:scale-[1.05] opacity-0 group-hover:opacity-80 transition-all duration-200 ${
                        isMobile ? 'opacity-100' : ''
                      }`}
                      onClick={() => deleteSkill(index)}
                    />
                  </div>
                ))}
                <ThemedButton
                  type='button'
                  variant='secondary'
                  hidden={false}
                  onClick={addSkill}
                  disabled={skills.length >= 5}
                  className=' flex items-center justify-center gap-2'
                >
                  Añadir <FaCirclePlus size={18} />
                </ThemedButton>

                <span>Color</span>
                <div className='w-full flex items-center justify-center mt-2 lg:mt-0'>
                  <HexColorPicker
                    style={{ width: '100%', height: 150 }}
                    color={color}
                    onChange={setColor}
                    className='hidden lg:flex'
                  />
                </div>
                <ThemedButton
                  type='submit'
                  hidden={true}
                  variant='primary'
                  onClick={handleSubmit}
                >
                  Crear tarjeta
                </ThemedButton>
              </form>
            </div>

            <div className='gap-6 items-center justify-center flex-1 mt-20 lg:-mt-80 hidden lg:flex lg:flex-col'>
              <CardPresentation
                name={name}
                profession={profession}
                links={links}
                portfolio={portfolio}
                skills={skills}
                description={description}
                image={imagePreview!!}
              />
              <ThemedButton
                type='submit'
                hidden={false}
                variant='primary'
                onClick={handleSubmit}
                className='!w-40 '
              >
                Crear tarjeta
              </ThemedButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
