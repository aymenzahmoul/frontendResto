import { IconCommand, IconLayoutDashboard, IconLogin, IconUsers, IconUserPlus, IconShoppingCartPlus, IconMoped, IconBrandMeta, IconBrandUnsplash, IconCategory } from '@tabler/icons';
import { uniqueId } from 'lodash';


const MenuItems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'commande',
    icon: IconShoppingCartPlus,
    href: '/orders',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUsers,
    href: '/users',

  },

  {
    id: uniqueId(),
    title: 'Plats',
    icon: IconCommand,
    href: '/produits',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    id: uniqueId(),
    title: 'Chatting',
    icon: IconBrandMeta,
    href: '/chatting',
  },
  {
    id: uniqueId(),
    title: 'Category',
    icon: IconCategory,
    href: '/category',
  },
  {
    id: uniqueId(),
    title: 'Stock',
    icon: IconBrandUnsplash,
    href: '/stock',
  },
];

export default MenuItems;
