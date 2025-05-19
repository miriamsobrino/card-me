import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS } from '../constants/constants';
import { useAuthContext } from '../context/AuthContext';
import { useCardContext } from '../context/CardContext';
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from 'react-icons/md';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../config/firebase-config';
import { uploadBytes } from 'firebase/storage';
import { CardPresentation } from '../components/CardPresentation';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { HexColorPicker } from 'react-colorful';
import { normalizeUrl } from '../utils/normalizeUrl';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedInput } from '../components/ThemedInput';

export default function FormPage() {
  const { cardData, createCard } = useCardContext();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [links, setLinks] = useState<{ platform: string; url: string }[]>([]);
  const [portfolio, setPortfolio] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>(['']);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [color, setColor] = useState('#1e2939');
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (cardData) {
      setImage(cardData.image);
      setName(cardData.name);
      setProfession(cardData.profession);
      setPortfolio(cardData.portfolio);
      setLinks(cardData.links);
      setDescription(cardData.description);
      setSkills(cardData.skills ? cardData.skills : ['']);
      setImagePreview(cardData.image || null);
      setColor(cardData.color);
    }
  }, [cardData]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const addLink = (platform: string) => {
    if (platform.trim() === '') return;
    setLinks([...links, { platform, url: '' }]);
  };
  const addSkill = () => {
    if (skills.length < 5) {
      setSkills([...skills, '']);
    }
  };

  const deleteLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };
  const deleteSkill = (index: number) => {
    setSkills(skills.filter((__, i) => i !== index));
  };
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index].url = value;
    setLinks(newLinks);
  };
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setImageFile(file);
  };

  const validLinks = links.map((link) => ({
    ...link,
    url: normalizeUrl(link.url),
  }));
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const slug =
      name.toLowerCase().replace(/\s+/g, '-') + '-' + user?.uid.slice(0, 5);
    const completedSkills = skills!!.filter((skill) => skill.trim() !== '');
    const portfolioLink = normalizeUrl(portfolio);
    let publicImageUrl = '/user.png';
    if (imageFile) {
      try {
        const storageRef = ref(
          storage,
          `images/${user?.uid}/${imageFile?.name}`
        );
        await uploadBytes(storageRef, imageFile);
        publicImageUrl = await getDownloadURL(storageRef);
      } catch (e) {
        console.error('No se puede descargar la imagen');
      }
    }
    if (name && profession && description && links && skills) {
      const cardData = {
        id: uuidv4(),
        image: publicImageUrl,
        name,
        profession,
        description,
        portfolio: portfolioLink,
        links: validLinks,
        skills: completedSkills,
        color,
      };
      if (user) {
        await createCard(user.uid, cardData);
      }
      navigate(`/${slug}`);
    } else {
      alert('Debes rellenar todos los campos');
    }
  };

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
              <div className='lg:w-36 lg:h-36 w-28 h-28 rounded-full overflow-hidden relative cursor-pointer group'>
                <img
                  src={image ? image : imagePreview || '/user.png'}
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

                {cardData && <label htmlFor='profession'>Profesión</label>}
                <ThemedInput
                  id='profession'
                  placeholder='Profesión'
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />

                <label htmlFor='link' className='text-start'>
                  Links RRSS
                </label>

                <select
                  id='platform'
                  className='border-white/20 border-2 rounded-md p-2 outline-none w-full focus:border-white/40'
                  onChange={(e) => addLink(e.target.value)}
                >
                  <option value='' className='bg-gray-700'>
                    Selecciona una plataforma
                  </option>
                  {PLATFORMS.map((platform) => (
                    <option
                      key={platform}
                      value={platform}
                      className='bg-gray-800'
                      disabled={links.some(
                        (link) => link.platform === platform
                      )}
                    >
                      {platform}
                    </option>
                  ))}
                </select>

                {links.map((link, index) => (
                  <div
                    key={index}
                    className='flex w-full justify-between group relative'
                  >
                    <ThemedInput
                      placeholder={`Enlace de ${link.platform}`}
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                    />

                    <FaCircleMinus
                      className='absolute right-2 top-4 cursor-pointer hover:opacity-100 hover:scale-[1.05] opacity-0 group-hover:opacity-80 transition-all duration-200'
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
                      className='absolute right-2 top-4 cursor-pointer hover:opacity-100 hover:scale-[1.05] opacity-0 group-hover:opacity-80 transition-all duration-200'
                      onClick={() => deleteSkill(index)}
                    />
                  </div>
                ))}
                <ThemedButton
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
                links={validLinks}
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
