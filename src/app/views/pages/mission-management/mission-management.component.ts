import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../../service/mission.service';
import { UserService } from '../../../service/user.service';
import { RoleService } from '../../../service/role.service';
import { Mission, CreateMissionRequest } from '../../../models/mission.model';
import { UserRoleDTO } from '../../../models/user.model';
import { Role } from '../../../models/role.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from '@coreui/angular';

@Component({
  selector: 'app-mission-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonDirective],
  templateUrl: './mission-management.component.html',
  styleUrls: ['./mission-management.component.scss']
})
export class MissionManagementComponent implements OnInit {
  missions: Mission[] = [];
  users: UserRoleDTO[] = [];
  roles: Role[] = [];
  selectedMission: Mission = {
    id: 0,
    titre: '',
    description: '',
    budget: 0,
    datePublication: '',
    dateLimit: ''
  };
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  selectedUserId?: number;

  constructor(
    private missionService: MissionService,
    private userService: UserService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadMissions();
    this.loadUsers();
    this.loadRoles();
  }

  loadMissions(): void {
    this.missionService.getAllMissions().subscribe({
      next: (missions: Mission[]) => {
        this.missions = missions;
      },
      error: (err: any) => console.error('Erreur chargement missions:', err)
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: UserRoleDTO[]) => {
        this.users = users;
      },
      error: (err: any) => console.error('Erreur chargement utilisateurs:', err)
    });
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      error: (err: any) => console.error('Erreur chargement rôles:', err)
    });
  }

  openAddModal(): void {
    this.selectedMission = {
      id: 0,
      titre: '',
      description: '',
      budget: 0,
      datePublication: '',
      dateLimit: ''
    };
    this.selectedUserId = undefined;
    this.isEditing = false;
    this.isModalOpen = true;
  }

  openEditModal(mission: Mission): void {
    this.selectedMission = { ...mission };
    this.selectedUserId = mission.user?.id;
    this.isEditing = true;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedMission = {
      id: 0,
      titre: '',
      description: '',
      budget: 0,
      datePublication: '',
      dateLimit: ''
    };
    this.selectedUserId = undefined;
  }

  onSaveMission(): void {
    if (this.isEditing) {
      this.updateMission();
    } else {
      this.createMission();
    }
  }

  createMission(): void {
    const missionToCreate: CreateMissionRequest = {
      titre: this.selectedMission.titre,
      description: this.selectedMission.description,
      budget: this.selectedMission.budget,
      datePublication: this.selectedMission.datePublication,
      dateLimit: this.selectedMission.dateLimit,
      user: this.selectedUserId ? { id: this.selectedUserId } : undefined
    };

    this.missionService.createMission(missionToCreate).subscribe({
      next: (mission: Mission) => {
        this.loadMissions();
        this.closeModal();
        alert('Mission créée avec succès!');
      },
      error: (err: any) => {
        console.error('Erreur création mission:', err);
        alert('Erreur lors de la création de la mission');
      }
    });
  }

  updateMission(): void {
    const missionToUpdate: CreateMissionRequest = {
      titre: this.selectedMission.titre,
      description: this.selectedMission.description,
      budget: this.selectedMission.budget,
      datePublication: this.selectedMission.datePublication,
      dateLimit: this.selectedMission.dateLimit,
      user: this.selectedUserId ? { id: this.selectedUserId } : undefined
    };

    this.missionService.updateMission(this.selectedMission.id, missionToUpdate)
      .subscribe({
        next: (mission: Mission) => {
          this.loadMissions();
          this.closeModal();
          alert('Mission mise à jour avec succès!');
        },
        error: (err: any) => {
          console.error('Erreur mise à jour mission:', err);
          alert('Erreur lors de la mise à jour de la mission');
        }
      });
  }

  assignUserToMission(missionId: number, userId: number): void {
    this.missionService.assignUserToMission(missionId, userId)
      .subscribe({
        next: (mission: Mission) => {
          this.loadMissions();
          alert('Utilisateur assigné avec succès!');
        },
        error: (err: any) => {
          console.error('Erreur assignation utilisateur:', err);
          alert('Erreur lors de l\'assignation de l\'utilisateur');
        }
      });
  }

  deleteMission(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
      this.missionService.deleteMission(id).subscribe({
        next: () => {
          this.loadMissions();
          alert('Mission supprimée avec succès!');
        },
        error: (err: any) => {
          console.error('Erreur suppression mission:', err);
          alert('Erreur lors de la suppression de la mission');
        }
      });
    }
  }

  getUserRoles(user: UserRoleDTO): string {
    return Array.from(user.roles).join(', ');
  }
}