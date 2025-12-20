const iconsPath = '/src/assets/icons/navigation/menu/';
const MenuItemsData = [
  {
    icon: `${iconsPath}Overview.svg`,
    text: 'Overview',
    alt: 'Overview icon',
    href: '/overview',
  },
  {
    icon: `${iconsPath}Analytics.svg`,
    text: 'Analytics',
    alt: 'Analytics icon',
    href: '/analytics',
  },
  {
    icon: `${iconsPath}Transactions.svg`,
    text: 'Transactions',
    alt: 'Transactions icon',
    href: '/transactions',
  },
  {
    icon: `${iconsPath}NewTransaction.svg`,
    text: 'Add Transaction',
    alt: 'Investments Transaction',
    href: '/add-transaction',
  },
  {
    icon: `${iconsPath}Reports.svg`,
    text: 'Reports',
    alt: 'Reports icon',
    href: '/reports',
  }
];

export default MenuItemsData;