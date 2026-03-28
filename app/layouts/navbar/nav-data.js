import config from '~/config.json';

export const navLinks = [
  {
    label: 'About',
    pathname: '/#about',
  },
  {
    label: 'Skills',
    pathname: '/#skills',
  },
  {
    label: 'Projects',
    pathname: '/#projects',
  },
  {
    label: 'Experience',
    pathname: '/#experience',
  },
  {
    label: 'Certifications',
    pathname: '/#certifications',
  },
  {
    label: 'Contact',
    pathname: '/#contact',
  },
  {
    label: 'Articles',
    pathname: '/articles',
  },
];

export const socialLinks = [
  {
    label: 'Bluesky',
    url: `https://bsky.app/profile/${config.bluesky}`,
    icon: 'bluesky',
  },
  {
    label: 'Figma',
    url: `https://www.figma.com/${config.figma}`,
    icon: 'figma',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
];
