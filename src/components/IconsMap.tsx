import { GithubIcon } from './icons/GithubIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { TwitterIcon } from './icons/TwitterIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { TwitchIcon } from './icons/TwitchIcon';
import { BehanceIcon } from './icons/BehanceIcon';
import type { JSX } from 'react';

export const iconsMap: Record<string, JSX.Element> = {
  'github.com': <GithubIcon width={24} height={24} />,
  'instagram.com': <InstagramIcon width={24} height={24} />,
  'linkedin.com': <LinkedinIcon width={24} height={24} />,
  'x.com': <TwitterIcon width={22} height={22} />,
  'youtube.com': <YoutubeIcon width={32} height={32} />,
  'twitch.tv': <TwitchIcon width={24} height={24} />,
  'behance.net': <BehanceIcon width={24} height={24} />,
};
