// src/app/models/user.model.ts

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  roles: string[];
  // Ajoutez cette ligne si elle n'existe pas
}