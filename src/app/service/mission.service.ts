import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission, CreateMissionRequest } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'http://localhost:8080/missions';

  constructor(private http: HttpClient) {}

  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMissionById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${id}`);
  }

  createMission(mission: CreateMissionRequest): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/mission-user`, mission);
  }

  createMissionWithoutUser(mission: CreateMissionRequest): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/add-mission`, mission);
  }

  assignUserToMission(missionId: number, userId: number): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/assign/${missionId}/${userId}`, {});
  }

  updateMission(id: number, mission: CreateMissionRequest): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${id}`, mission);
  }

  deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}