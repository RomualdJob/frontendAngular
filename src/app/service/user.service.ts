import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';  // Modèle pour l'utilisateur (conforme à ton code)
import { Role } from '../models/role.model';
// Pas besoin d'importer Role ici si tu n'utilises pas Role directement dans ce fichier

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; // L'URL de ton API backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un utilisateur par son ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Modifier un utilisateur
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update/${id}`, user);
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Ajouter un nouvel utilisateur
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, user);
  }

  // Récupérer tous les rôles (si nécessaire)
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`http://localhost:8080/roles/all`);
  }
  
}
