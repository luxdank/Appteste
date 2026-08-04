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

export const SPECIALISTS: Specialist[] = [
  {
    id: 'spec-1',
    name: 'Beatriz Silva',
    role: 'UI/UX Designer',
    level: 'Senior',
    rating: 4.9,
    reviewsCount: 84,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYqS64DFPkk-_wAAy2LNuo9UAN1l75gAapfmL5QdmIjdW-c_pQLrjrG8IBtFXkO3FmnMNZj-B3YDmv4xSY3AexE7wvnCMmNU_pFz-TCtzAMolS_gsp7CE61gWnv31STpticm8PaNbZW5fiFk5E-H6zG1oUpE_GtD4G8ANoEjlgKonK7ZKI0vjoqWQGaiN87HpE_I7APgv0yGF4d00F4v9Qy3V8-eTJLaddcgkEkj9NrFYMjCs-Ijyno6xMk3jMKuiLQyC9tvQp1zM',
    isOnline: true,
    responseTime: '3 minutos',
    hourlyRate: 'R$ 130/h',
    skills: ['Figma', 'UI/UX Design', 'Design System', 'Prototipagem', 'Design de Landing Pages', 'Design Tokens', 'User Research'],
    bio: 'Especialista em criar interfaces modernas de alta conversão para SaaS e E-commerce. Com mais de 6 anos liderando produtos digitais em startups e agências, traduzo regras de negócio complexas em telas limpas, funcionais e apaixonantes.',
    completedProjects: 48,
    distanceKm: 1.2,
    lat: -23.5505,
    lng: -46.6333,
    featuredProjectImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0F3IUinMI9YIFAiFVLGsfbw1UARfkRfGBhIy-WX9SZL8TrkPZtuhivdPHMbivM4N2I5RIvwnGV_fNzMANBslAHPjqEjIX7sNfHAYoDSZgxWuurjItpPb2YxIY4aEW0lRII09b8uK8bAiTvJQKcPoIMOxZVGTtpOCvytBiJDzur6Kc46aLd7-bMRSj5QGmEjOCt6lUWXWetKNZauDHBOWUFrkO_StDLb5IoIidmzPA2jTkaG5kIMPSIv6demTNElicBaYaZq4Hr0',
    location: 'São Paulo, SP (Jardins - 1.2 km)',
    languages: ['Português (Nativo)', 'Inglês (Avançado)'],
    portfolio: [
      {
        id: 'port-1',
        title: 'Redesign SaaS FinTech FinX',
        category: 'UI/UX & Mobile App',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0F3IUinMI9YIFAiFVLGsfbw1UARfkRfGBhIy-WX9SZL8TrkPZtuhivdPHMbivM4N2I5RIvwnGV_fNzMANBslAHPjqEjIX7sNfHAYoDSZgxWuurjItpPb2YxIY4aEW0lRII09b8uK8bAiTvJQKcPoIMOxZVGTtpOCvytBiJDzur6Kc46aLd7-bMRSj5QGmEjOCt6lUWXWetKNZauDHBOWUFrkO_StDLb5IoIidmzPA2jTkaG5kIMPSIv6demTNElicBaYaZq4Hr0',
        metrics: '+180% na conversão de onboarding',
        description: 'Fluxo completo de onboarding bancário simplificado de 7 etapas para apenas 3 telas com validação biométrica em tempo real.'
      },
      {
        id: 'port-2',
        title: 'Design System Lumina',
        category: 'Design System',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Spe-LRBFoMI4aMAE7QaMwRNjD_ys7O1tj_JSSgJfhOZU0TTDHmegIl2os4mwwuz2ptPRK1n3Dj00k3jJTnHQUxlNTkWfMdNPzC9A9YnufruwojodTds_54HZ0Gv-Sgm2M_bOqUqQPKINqZ97bfzdQ7Y0CWVdfZKpeyHhXj6U1I18hHysxSupL9DyjpLP7LSkppUsoHi8aQNxxjSIIlKTBR8rp7jFJ7HX67bKAhdmKYoXlcoW5YgpCIjd56YK3yDgU-lcGTeEvVE',
        metrics: 'Usado por 14 squads de dev',
        description: 'Construção de biblioteca com mais de 200 componentes reutilizáveis no Figma com tokens sincronizados com Tailwind CSS.'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        clientName: 'Fernando Costa',
        clientRole: 'Head de Produto na PayFlow',
        clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Yh5CcbU3vlzS_RI-KXMtVzO9J5R1QPWxHLsmH-tEo4dNCXV2YHvj-43j-0hQdPj3xF6BKGbyZ9EcxACRPR_e05ceI4yxcEjhg_f1u5hlxUri8RT_KfEBiVcRbWs_nmCaHar6_I14dbuCQIBw4s02KJ_iV5-JJRhyBSNCb8yvfaqmoh8yvhkjKHn5x3NeKaVjsFy6yd1fwxZ3_zoQTSwOm3K14YKOpgNxCcWCiks0TAKakDyg8cRfAVdjlwoD3SL6T4iEx7F8ckM',
        rating: 5,
        date: 'Há 1 semana',
        projectTitle: 'Redesign de Checkout Mobile',
        comment: 'A Beatriz entendeu nossa dor no primeiro briefing. Entregou um protótipo impecável em menos de 48h com todos os estados interativos mapeados. Recomendo de olhos fechados!'
      },
      {
        id: 'rev-2',
        clientName: 'Mariana Duarte',
        clientRole: 'CEO na EdTech Aprende+',
        clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdTgGNAO_4NwKUWUx-pC0KdiH1EZsCNN9PdbKsLYMuk5F9qeiCaZCQE-eeL3qGrAWhtO0Obl9qUePdcT0ecJEYv3Z1VA4z5LmX6ISVVDefVt5BDTTjEb-_u9b77DiVsIei7IfhI0YDM4cmyOna_chxPYi2MP_nAVvUirJtUuLp9v-z_gdyiFXqP6wUSZxyRQWIepkF_U-TzG4uIckP9Fcy1pinBzHMiqDUAYcsIrh9TsgtfvaeyBC9ZGL_kNRxJNEdi__0zBDIRhg',
        rating: 5,
        date: 'Há 3 semanas',
        projectTitle: 'UI do Dashboard do Aluno',
        comment: 'A qualidade estética e atenção à acessibilidade superaram nossas expectativas. Nossos usuários adoraram o novo visual!'
      }
    ]
  },
  {
    id: 'spec-2',
    name: 'Ricardo Lima',
    role: 'Fullstack Developer',
    level: 'Senior',
    rating: 5.0,
    reviewsCount: 112,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKla-TaXGz7yYsfqHC9SjO2WnfZdWLYYZKlJZpHTEMzuAFSwd8T-9-_-e9lFYyD-O7ITH_L96V34U3iBdX24hn3GQFnVSCnlpNXlj-wlRfShN2ZiIK9toDTobfowIXb4mKYbpfcScAqty19A3oJo0h0wzo5x5Dn4rlvEBqgi8ZGq3KUanSdR2J4s9-uxvBWib3zC98sgsXbcHBXgCZJ63JluaYPx5lgsYYE0uJsnYEZRYqWdVJqm_xh3XtslXmO0_48LNh2SoOTUM',
    isOnline: true,
    responseTime: '5 minutos',
    hourlyRate: 'R$ 160/h',
    skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'API GraphQL', 'PostgreSQL', 'Docker'],
    bio: 'Desenvolvedor Fullstack focado em aplicações web ultrarrápidas, integrações de pagamento e arquiteturas escaláveis. Forte experiência em React, Node e TypeScript com foco em código limpo.',
    completedProjects: 62,
    distanceKm: 2.8,
    lat: -23.5615,
    lng: -46.6559,
    location: 'São Paulo, SP (Pinheiros - 2.8 km)',
    languages: ['Português (Nativo)', 'Inglês (Fluente)'],
    portfolio: [
      {
        id: 'port-3',
        title: 'Plataforma B2B de Logística',
        category: 'Fullstack Web App',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0F3IUinMI9YIFAiFVLGsfbw1UARfkRfGBhIy-WX9SZL8TrkPZtuhivdPHMbivM4N2I5RIvwnGV_fNzMANBslAHPjqEjIX7sNfHAYoDSZgxWuurjItpPb2YxIY4aEW0lRII09b8uK8bAiTvJQKcPoIMOxZVGTtpOCvytBiJDzur6Kc46aLd7-bMRSj5QGmEjOCt6lUWXWetKNZauDHBOWUFrkO_StDLb5IoIidmzPA2jTkaG5kIMPSIv6demTNElicBaYaZq4Hr0',
        metrics: '99.9% Uptime e <100ms tempo de carregamento',
        description: 'Arquitetura com Next.js, WebSockets para rastreamento de frotas em tempo real e backend em Node.js.'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        clientName: 'Lucas Albuquerque',
        clientRole: 'CTO na LogisExpress',
        clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfNxw1yh1W1uhonZFH5fJoqJDa70mJVdQ1yNiT05VEgRQCI9RIqzfcX-U5DG-4wfuJxkmIxNPNtK-FKPKnd6uNBfSW4stCneORvvm3DVK3OtPxfeaM-w1fjBTqge-irLAzIbtp5ucMGsGe0MnUlY3aNUdHa-eA5BS4A3KOvPu56tw2NquDX08cbQF6tKLrLwjK1e5q9tBiXSg9Z86OLeLPiSMrsOoR3HnFSdpbyNZTRQ5RbjwVYgj9hQiDsoI_JdK4rq82nY96DvE',
        rating: 5,
        date: 'Há 5 dias',
        projectTitle: 'Migração Frontend Next.js',
        comment: 'O Ricardo é um desenvolvedor excepcional. Código extremamente limpo, bem documentado e entregue antes do prazo final.'
      }
    ]
  },
  {
    id: 'spec-3',
    name: 'Camila Fernandes',
    role: 'Engenheira de Software IA',
    level: 'Master',
    rating: 4.95,
    reviewsCount: 56,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyo1eojwqTZIxp53qIStf6dI7718rsK-XvPzkNowVD96cCbJ0UXn2C5uGnhU66O9E0D1J9bQ_QWKmFyg-wdW_djr4SoTwhkJvMNWVFnw5AuD5kthHYwUjjUgL6EsGU9qhLHGQlLyE2lr_G11YRk4ZeeyBpZJGwDf23tPeIbHJN2G3NumxLnb6oF-Aa_xOqGKF63MR9GsDbmpwuW7nblZB_tFEVsburky5tmQUzMTwBItyUG8bTgTGm3plTnan3Ih85jQzyrO0p2DQ',
    isOnline: true,
    responseTime: '2 minutos',
    hourlyRate: 'R$ 180/h',
    skills: ['Gemini API', 'Engenharia de Prompt', 'Python', 'Machine Learning', 'RAG', 'LangChain', 'FastAPI'],
    bio: 'Desenvolvo soluções de Inteligência Artificial personalizadas e fluxos automatizados inteligentes para startups e enterprise com garantia de precisão e segurança de dados.',
    completedProjects: 39,
    distanceKm: 4.5,
    lat: -23.5415,
    lng: -46.6210,
    location: 'São Paulo, SP (Vila Madalena - 4.5 km)',
    languages: ['Português (Nativo)', 'Inglês (Avançado)'],
    portfolio: [
      {
        id: 'port-4',
        title: 'Assistente Virtual de Atendimento por IA',
        category: 'Inteligência Artificial',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Spe-LRBFoMI4aMAE7QaMwRNjD_ys7O1tj_JSSgJfhOZU0TTDHmegIl2os4mwwuz2ptPRK1n3Dj00k3jJTnHQUxlNTkWfMdNPzC9A9YnufruwojodTds_54HZ0Gv-Sgm2M_bOqUqQPKINqZ97bfzdQ7Y0CWVdfZKpeyHhXj6U1I18hHysxSupL9DyjpLP7LSkppUsoHi8aQNxxjSIIlKTBR8rp7jFJ7HX67bKAhdmKYoXlcoW5YgpCIjd56YK3yDgU-lcGTeEvVE',
        metrics: '85% das dúvidas resolvidas automaticamente',
        description: 'Integração de Gemini Flash com base de conhecimento em vetor para suporte de clientes 24h.'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        clientName: 'Roberto Silveira',
        clientRole: 'Fundador da LegalTech AI',
        clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-Yh5CcbU3vlzS_RI-KXMtVzO9J5R1QPWxHLsmH-tEo4dNCXV2YHvj-43j-0hQdPj3xF6BKGbyZ9EcxACRPR_e05ceI4yxcEjhg_f1u5hlxUri8RT_KfEBiVcRbWs_nmCaHar6_I14dbuCQIBw4s02KJ_iV5-JJRhyBSNCb8yvfaqmoh8yvhkjKHn5x3NeKaVjsFy6yd1fwxZ3_zoQTSwOm3K14YKOpgNxCcWCiks0TAKakDyg8cRfAVdjlwoD3SL6T4iEx7F8ckM',
        rating: 5,
        date: 'Há 2 semanas',
        projectTitle: 'Pipeline de Resumo de Documentos',
        comment: 'Camila domina o estado da arte de LLMs e arquitetura RAG. Trouxe insights que economizaram semanas de engenharia.'
      }
    ]
  },
  {
    id: 'spec-4',
    name: 'Carlos Mendes',
    role: 'Mobile Lead (iOS/Android)',
    level: 'Senior',
    rating: 4.88,
    reviewsCount: 43,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc4_O-bIGAiID0MKO6U8NKSEpET_tGb1slj8OSPdIdkFwjFr62gwnnY8lnNtdwlacLGs6eZdaIdPxzMtb2C9cM3Aa6VQaZOcEDHKVN-a0aQdqcLgytmEGFFOgQ3sd7ateFzK0JlgzB_IhMolGrEvVJG0hrrHAgULUJ8SbA0859b8gU6rTaaEx54nhXDA1eUVKSLvXFpROk6ITtXCK4ZuKLYSEt9mACUjqSu3wAxL9Eg9M7p7_Ks2-bouqCkIlOf76_aPN0z_pjgbY',
    isOnline: true,
    responseTime: '4 minutos',
    hourlyRate: 'R$ 150/h',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
    bio: 'Desenvolvimento mobile multiplataforma fluido com performance nativa e publicação nas lojas App Store e Google Play.',
    completedProjects: 31,
    distanceKm: 7.2,
    lat: -23.5800,
    lng: -46.6800,
    location: 'São Paulo, SP (Itaim Bibi - 7.2 km)',
    languages: ['Português (Nativo)', 'Inglês (Intermediário)']
  },
  {
    id: 'spec-5',
    name: 'Ana Clara Prado',
    role: 'Motion & Brand Specialist',
    level: 'Pleno/Senior',
    rating: 4.92,
    reviewsCount: 71,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCee_cbM4ZgJ2XhxQbvf3K32rizkXCucSNydIcXYMovQKxd6sfnCL0YtLdxk3c1oQvE-OsVkhTifbYMp4Xr_TL4jZgr6Vb3vv9JphanPn5SZQhYnCkrsec-eX2-nI2GQdtXkU256yE4ngpLB61PktFlc7qYD4tRtz95Csyz11tP5-2b5wTseraH1kMBCRDMbalKg9UXlJktQAWt3QfhXvH6P1TTVXSZhqxDGGztAjJj4G3zXIRuW9W8r52qQ6MJQSIRaJjY2bYlzO0',
    isOnline: true,
    responseTime: '6 minutos',
    hourlyRate: 'R$ 140/h',
    skills: ['After Effects', 'Lottie', 'Identidade Visual', '3D Motion', 'Branding'],
    bio: 'Crio animações marcantes e identidades visuais de alto impacto que encantam os clientes e elevam a percepção de marca.',
    completedProjects: 53,
    distanceKm: 9.8,
    lat: -23.5200,
    lng: -46.6400,
    location: 'São Paulo, SP (Moema - 9.8 km)',
    languages: ['Português (Nativo)', 'Inglês (Fluente)']
  },
  {
    id: 'spec-6',
    name: 'Gabriel Arantes',
    role: 'Tech Lead & Arquiteto Cloud',
    level: 'Master',
    rating: 5.0,
    reviewsCount: 95,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4_KIWaIS1Z25I4ex0m9vrfrUT-bI74cLa9bMsvmxt5O4yAbOUsUgpvxeblWtSUfL9k-uVNwEyjXF5QxKk1DGO9Xk_CEUvMTitHWN_-z4wd5KEWUPN7Mof5B14WOQCtu5pqfEJLa9v-6GDuS-ymI197wTB1hkFOVQ4D_v3StkO5e6Xhvn7VDWrDq7lfKvQEFk6lKOw_25O38sk3TIYKls5LZHjYN7J1af4tG8kck7ZVNmPJJIkq2Z8i-Qvn9to--IyZhcyC-CglgQ',
    isOnline: true,
    responseTime: '1 minuto',
    hourlyRate: 'R$ 210/h',
    skills: ['Google Cloud', 'Docker', 'Kubernetes', 'Microserviços', 'Security Audit'],
    bio: 'Consultoria de infraestrutura e otimização de performance para sistemas distribuídos e plataformas corporativas.',
    completedProjects: 77,
    distanceKm: 14.1,
    lat: -23.6000,
    lng: -46.7000,
    location: 'São Paulo, SP (Alphaville - 14.1 km)',
    languages: ['Português (Nativo)', 'Inglês (Fluente)']
  }
];

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
    assignedSpecialists: [SPECIALISTS[0], SPECIALISTS[1]]
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
    assignedSpecialists: [SPECIALISTS[3]]
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
    assignedSpecialists: [SPECIALISTS[0], SPECIALISTS[4]]
  }
];
