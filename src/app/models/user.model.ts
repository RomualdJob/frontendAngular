// src/app/models/user.model.ts

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  password: string; // Ajoutez cette ligne si elle n'existe pas
}