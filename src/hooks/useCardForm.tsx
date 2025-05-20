import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useCardContext } from '../context/CardContext';
import { normalizeUrl } from '../utils/normalizeUrl';
import { v4 as uuidv4 } from 'uuid';
import { uploadImage } from '../utils/uploadImage';

export function useCardForm() {
  const { cardData, createCard } = useCardContext();
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const slug =
      name.toLowerCase().replace(/\s+/g, '-') + '-' + user?.uid.slice(0, 5);
    const completedSkills = skills.filter((skill) => skill.trim() !== '');
    const validLinks =
      links &&
      links.map((link) => ({
        ...link,
        url: normalizeUrl(link.url),
      }));
    const portfolioLink =
      portfolio.trim() !== '' ? normalizeUrl(portfolio) : '';
    let publicImageUrl = imagePreview ? imagePreview : '/user.png';
    if (imageFile) {
      try {
        publicImageUrl = await uploadImage(user ? user.uid : '', imageFile);
      } catch (e) {
        console.error('No se puede descargar la imagen');
      }
    }
    if (name && profession && description) {
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

  return {
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
  };
}
