import { ServiceCategory, Specialist, Project } from '../types';

export const USER_PROFILE = {
  name: 'Luiz',
  fullName: 'Luiz Gustavo',
  email: 'lhgsdos@gmail.com',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQrWUy1xEGyqar6IiaUN-mtVOMGUqIfpp-NsFc1RfrrQK40wQ3MmWl-LHLRfw3kuihclI9a2XpQ-AIeroktbEE1hrt6-B7psq3IZ1xPosWLdN8cc0uQWh6UYi-mPT5gwJj0fM8qiQjgcmvdhXI45GCLeO0utmi_fDBjcXclvaKvQ61wMFiVS7cuZ6blKXNukHZr8njBYhUTDR-N5PslkX-B0w8wslXlZeqOQxpbujvCSAwd55vIp4Eb4mRVzGV0Omb3wG0J4TVQU',
  role: 'Fundador & Produto',
  activeProjectsCount: 2,
  completedProjectsCount: 14,
};

export const ONBOARDING_IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Spe-LRBFoMI4aMAE7QaMwRNjD_ys7O1tj_JSSgJfhOZU0TTDHmegIl2os4mwwuz2ptPRK1n3Dj00k3jJTnHQUxlNTkWfMdNPzC9A9YnufruwojodTds_54HZ0Gv-Sgm2M_bOqUqQPKINqZ97bfzdQ7Y0CWVdfZKpeyHhXj6U1I18hHysxSupL9DyjpLP7LSkppUsoHi8aQNxxjSIIlKTBR8rp7jFJ7HX67bKAhdmKYoXlcoW5YgpCIjd56YK3yDgU-lcGTeEvVE',
  avatars: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Yh5CcbU3vlzS_RI-KXMtVzO9J5R1QPWxHLsmH-tEo4dNCXV2YHvj-43j-0hQdPj3xF6BKGbyZ9EcxACRPR_e05ceI4yxcEjhg_f1u5hlxUri8RT_KfEBiVcRbWs_nmCaHar6_I14dbuCQIBw4s02KJ_iV5-JJRhyBSNCb8yvfaqmoh8yvhkjKHn5x3NeKaVjsFy6yd1fwxZ3_zoQTSwOm3K14YKOpgNxCcWCiks0TAKakDyg8cRfAVdjlwoD3SL6T4iEx7F8ckM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAdTgGNAO_4NwKUWUx-pC0KdiH1EZsCNN9PdbKsLYMuk5F9qeiCaZCQE-eeL3qGrAWhtO0Obl9qUePdcT0ecJEYv3Z1VA4z5LmX6ISVVDefVt5BDTTjEb-_u9b77DiVsIei7IfhI0YDM4cmyOna_chxPYi2MP_nAVvUirJtUuLp9v-z_gdyiFXqP6wUSZxyRQWIepkF_U-TzG4uIckP9Fcy1pinBzHMiqDUAYcsIrh9TsgtfvaeyBC9ZGL_kNRxJNEdi__0zBDIRhg',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDfNxw1yh1W1uhonZFH5fJoqJDa70mJVdQ1yNiT05VEgRQCI9RIqzfcX-U5DG-4wfuJxkmIxNPNtK-FKPKnd6uNBfSW4stCneORvvm3DVK3OtPxfeaM-w1fjBTqge-irLAzIbtp5ucMGsGe0MnUlY3aNUdHa-eA5BS4A3KOvPu56tw2NquDX08cbQF6tKLrLwjK1e5q9tBiXSg9Z86OLeLPiSMrsOoR3HnFSdpbyNZTRQ5RbjwVYgj9hQiDsoI_JdK4rq82nY96DvE'
  ],
  tipStudio: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0F3IUinMI9YIFAiFVLGsfbw1UARfkRfGBhIy-WX9SZL8TrkPZtuhivdPHMbivM4N2I5RIvwnGV_fNzMANBslAHPjqEjIX7sNfHAYoDSZgxWuurjItpPb2YxIY4aEW0lRII09b8uK8bAiTvJQKcPoIMOxZVGTtpOCvytBiJDzur6Kc46aLd7-bMRSj5QGmEjOCt6lUWXWetKNZauDHBOWUFrkO_StDLb5IoIidmzPA2jTkaG5kIM5PSIv6demTNElicBaYaZq4Hr0'
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'landing', name: 'Landing Page', subtitle: 'Conversão e vendas', iconName: 'Globe', popular: true },
  { id: 'app', name: 'Aplicativo', subtitle: 'iOS e Android', iconName: 'Smartphone' },
  { id: 'logo', name: 'Logo', subtitle: 'Identidade visual', iconName: 'Paintbrush' },
  { id: 'video', name: 'Vídeo', subtitle: 'Motion e edição', iconName: 'Video' },
  { id: 'website', name: 'Site', subtitle: 'Institucional/Blog', iconName: 'Layout' },
  { id: 'other', name: 'Outro', subtitle: 'Projeto sob medida', iconName: 'Plus' },
];

export const SPECIALISTS: Specialist[] = [];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'E-commerce de Moda v2',
    category: 'Landing Page & Checkout',
    description: 'Redesign completo da jornada de checkout e catálogo de produtos otimizado para dispositivos móveis.',
    status: 'EM ANDAMENTO',
    updatedAt: 'Há 2 dias',
    progressPercent: 75,
    deadline: '3 dias',
    budget: 'R$ 3.500',
    assignedSpecialists: []
  },
  {
    id: 'proj-2',
    title: 'App FitHealth',
    category: 'Aplicativo Mobile',
    description: 'Desenvolvimento de dashboard de métricas de saúde e treinos em tempo real para usuários premium.',
    status: 'REVISÃO',
    updatedAt: 'Há 5 dias',
    progressPercent: 90,
    deadline: '24 horas',
    budget: 'R$ 6.200',
    assignedSpecialists: []
  },
  {
    id: 'proj-3',
    title: 'Landing Page SaaS Nexo',
    category: 'Landing Page',
    description: 'Página institucional com animações em Lottie e integração direta com formulário de lead qualification.',
    status: 'CONCLUÍDO',
    updatedAt: 'Há 1 semana',
    progressPercent: 100,
    deadline: 'Entregue',
    budget: 'R$ 2.800',
    assignedSpecialists: []
  }
];
