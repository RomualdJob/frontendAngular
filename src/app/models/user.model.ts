export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  password?: string;
}

// Ajoutez simplement cette interface
export interface UserRoleDTO {
  id: number;
  name: string;
  email: string;
  roles: string[]; // Ou Set<string> selon votre backend
}