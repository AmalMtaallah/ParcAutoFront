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
  
  export const chauItems: NavData[] = [
    {
      
      name: 'Espace Chauffeur',
      url: '/dashboardchauffeur',
      icon: 'icon-user',
     
    },  
    {
      name: 'historique Mission',
      url: '/chauffeur',
      icon: 'icon-user',
      children: [
        {
          name: 'Historique',
          url: '/chauffeur/historique',
          icon: 'icon-plus'
        },
       
       
      ]
    },
   
  ]