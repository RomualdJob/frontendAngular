import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Mission} from '../models/mission.model';
@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private apiUrl = 'http://localhost:8080/missions'; 
             // URL de l'API (à remplacer)

  constructor(private http: HttpClient) { }

  // Récupérer toutes les missions
  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  // Récupérer une mission par son ID
  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une mission
  addMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/addmission`, mission);
  }

  addMissionUser(id: number, mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/misssion-user/${mission.id}/${id}`, mission);
  }


  // Mettre à jour une mission existante
  updateMission(id: number, mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/assign/${mission.id}/${id}`, mission);
  }

  // Supprimer une mission
  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
