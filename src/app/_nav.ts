import { OnInit } from "@angular/core";

interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Espace Admin',
    url: '/dashboard',
    icon: 'icon-user',
   
  },
 
  
  {
    title: false,
    name: ''
  },

  {
    name: 'Gérer',
    url: '/gestion',
    icon: 'icon-user',
    children: [
     
      {
        name: 'Chauffeurs',
        url: '/gestion/chauffeurs',
      },
      {
        name: 'Véhicules',
        url: '/gestion/vehicules',
      },
    ]
  },
  {
    name: ' Livraisons',
    url: '/mission/missions',
    icon: 'fa fa-truck',
   
  },
  {
    name: 'Maintenance',
    url: '/maintenance',
    icon: 'icon-settings',
    children: [
     
      {
        name: 'Assurance',
        url: '/maintenance/assurance',
      },{
        name: 'Visite Technique',
        url: '/maintenance/visiteTech',
      },
      {
        name: 'Changement Pneux',
        url: '/maintenance/pneux',
      },
      {
        name: 'Vidange',
        url: '/maintenance/vidange',
      },
     
    ]
  },

  {
    name: 'Live Cart',
    url: '/live-cart',
    icon: 'icon-flag',
  },
  {
    icon: 'icon-layers',
    name: 'Histo Maintenance',
    url: '/maintenance/historique',
  },
  {
    icon: 'icon-layers',
    name: 'Historique Circulation',
    url: '/historiquecirc',
  },
 
  {
    title: true,
    name: 'Paramétres',
  },
  {
    name: 'Déconnecter',
    url: '/logout',
    icon: 'icon-logout',
  },
  {
    name: 'Modifier Profile',
    url: '/profileAdmin',
    icon: 'icon-settings',
  },
 
  
 ];


