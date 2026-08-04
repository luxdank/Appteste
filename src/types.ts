export type NavigationTab = 'welcome' | 'home' | 'request' | 'radar' | 'projects' | 'profile' | 'specialist' | 'login' | 'register-pro';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  metrics: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  clientName: string;
  clientRole: string;
  clientAvatar: string;
  rating: number;
  date: string;
  projectTitle: string;
  comment: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  subtitle: string;
  iconName: string; // Lucide icon name
  badge?: string;
  popular?: boolean;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  level: string; // e.g., 'Senior', 'Master'
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  isOnline: boolean;
  responseTime: string; // e.g., '5 minutos'
  hourlyRate: string; // e.g., 'R$ 120/h'
  skills: string[];
  bio: string;
  completedProjects: number;
  featuredProjectImg?: string;
  location?: string;
  distanceKm?: number;
  lat?: number;
  lng?: number;
  languages?: string[];
  portfolio?: PortfolioItem[];
  reviews?: ReviewItem[];
}

export interface ServiceRequestPayload {
  serviceId: string;
  serviceName: string;
  urgency: string;
  title: string;
  description: string;
  budgetRange: string;
  location?: string;
  createdAt?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'EM ANDAMENTO' | 'REVISÃO' | 'CONCLUÍDO' | 'AGUARDANDO';
  updatedAt: string;
  progressPercent: number;
  deadline: string;
  budget: string;
  assignedSpecialists: Specialist[];
}

export interface NewRequestData {
  serviceId: string;
  serviceName: string;
  urgency: string; // 'Hoje' | '24 horas' | '3 dias' | '7 dias'
  title: string;
  description: string;
  budgetRange: string;
  step: number; // 1, 2, 3
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  avatarUrl: string;
  text: string;
  timestamp: string;
  isUser: boolean;
}
