import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faStackOverflow,
  faFreeCodeCamp,
  faGithub,
  faLinkedin,
  faYoutube,
  faFacebook,
  faDiscord,
  faInstagram,
  faDev,
  faGitlab,
  faWhatsapp,
  faTiktok,
  faReddit,
  faSpotify,
  faAmazon,
  faBehance,
  faSnapchat,
  faPatreon,
  faTelegram,
  faSoundcloud,
  faPinterest,
  faTwitch,
  faVimeo,
  faMedium,
  faDeezer,
  faCodepen,
  faThreads,
  faBluesky,
  faHashnode,
  faGoodreads
} from '@fortawesome/free-brands-svg-icons';

import { faEnvelope, faLaptop } from '@fortawesome/free-solid-svg-icons';

const brandIcons: Record<string, IconDefinition | null> = {
  'stack overflow': faStackOverflow,
  freecodecamp: faFreeCodeCamp,
  github: faGithub,
  linkedin: faLinkedin,
  youtube: faYoutube,
  facebook: faFacebook,
  discord: faDiscord,
  threads: faThreads,
  instagram: faInstagram,
  'dev.to': faDev,
  gitlab: faGitlab,
  hashnode: faHashnode,
  whatsapp: faWhatsapp,
  tiktok: faTiktok,
  reddit: faReddit,
  spotify: faSpotify,
  email: faEnvelope,
  amazon: faAmazon,
  behance: faBehance,
  snapchat: faSnapchat,
  patreon: faPatreon,
  goodreads: faGoodreads,
  telegram: faTelegram,
  soundcloud: faSoundcloud,
  pinterest: faPinterest,
  twitch: faTwitch,
  vimeo: faVimeo,
  medium: faMedium,
  bluesky: faBluesky,
  deezer: faDeezer,
  codepen: faCodepen,
  other: faLaptop
};

export const getBrandIconByName = (name: string): IconDefinition | null => {
  const key = name.trim().toLowerCase();
  return brandIcons[key] || null;
};
