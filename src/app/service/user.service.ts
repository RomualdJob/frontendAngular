import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserRoleDTO } from '../models/user.model';
import { Role } from '../models/role.model'; // Importez Role

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserRoleDTO[]> {
    return this.http.get<UserRoleDTO[]>(`${this.apiUrl}/all`);
  }

  getUserById(id: number): Observable<UserRoleDTO> {
    return this.http.get<UserRoleDTO>(`${this.apiUrl}/${id}`);
  }

  // AJOUTEZ JUSTE CETTE MÉTHODE MANQUANTE
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>('http://localhost:8080/roles/all');
  }

  // Le reste de vos méthodes existantes reste inchangé
  createUser(userData: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/signup`, userData);
  }

  updateUser(id: number, userData: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, userData);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  removeRoleFromUser(userId: number, roleName: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/remove-role/${userId}/${roleName}`, {});
  }
}