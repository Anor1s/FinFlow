const BASE = import.meta.env.BASE_URL;
const iconsPath = `${BASE}/assets/icons/navigation/other/`;

const OtherItemsData = [
  {
    icon: `${iconsPath}settings.svg`,
    text: 'Settings',
    alt: 'Overview icon',
    href: '/settings',
  },
  {
    icon: `${iconsPath}/Profile.svg`,
    text: 'Profile',
    alt: 'Profile avatar',
    href: '/profile',
  },
];

export default OtherItemsData;