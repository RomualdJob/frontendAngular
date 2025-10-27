import { User } from './user.model';

export interface Mission {
  id: number;
  titre: string;
  description: string;
  budget: number;
  datePublication: string;
  dateLimit: string;
  user?: User; // User complet ou undefined
}

// Créez une interface pour la création de mission
export interface CreateMissionRequest {
  titre: string;
  description: string;
  budget: number;
  datePublication: string;
  dateLimit: string;
  user?: { id: number }; // Seulement l'ID pour la création
}