export interface Card {
  id: string;
  image: string;
  name: string;
  profession: string;
  description: string;
  portfolio: string;
  links: { platform: string; url: string }[];
  skills: string[];
  color: string;
  ownerId: string;
}
