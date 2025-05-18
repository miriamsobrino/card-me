export interface Card {
  id: string;
  image: string;
  name: string;
  profession: string;
  description: string;
  links: { platform: string; url: string }[];
  skills: string[];
}
