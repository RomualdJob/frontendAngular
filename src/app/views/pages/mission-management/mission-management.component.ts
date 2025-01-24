import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../../service/mission.service';
import { Mission } from '../../../models/mission.model';
import { UserService } from '../../../service/user.service'; // Service pour récupérer les utilisateurs
//import { userForMission } from '../../../models/userForMission.model'; // Modèle de l'utilisateur
import { UserForMission } from '../../../models/UserForMission.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Assurez-vous d'importer FormsModule
import { ButtonDirective } from '@coreui/angular'; // Import CoreUI components nécessaires
import { RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective } from '@coreui/angular';
import { DefaultLayoutComponent } from '../../../layout';
import { DefaultHeaderComponent } from '../../../layout';
import { DefaultFooterComponent } from '../../../layout';


@Component({
  selector: 'app-mission-management',
  standalone: true,
  imports: [
    RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective,
    DefaultLayoutComponent, DefaultFooterComponent, DefaultHeaderComponent,
    CommonModule, FormsModule, ButtonDirective
  ],
  templateUrl: './mission-management.component.html',
  styleUrls: ['./mission-management.component.scss']
})
export class MissionManagementComponent implements OnInit {
  missions: Mission[] = []; // Liste des missions
  users: UserForMission[] = []; // Liste des utilisateurs
  isModalOpen: boolean = false; // Contrôle l'ouverture du modal
  selectedMission: Mission = { id: 0, title: '', description: '', dateDebut: '', dateLimit: '' }; // Mission sélectionnée
  isAdding: boolean = false; // Indique si on est en mode ajout

  constructor(
    private missionService: MissionService,
    private userService: UserService // Injecter le service utilisateur
  ) {}

  ngOnInit(): void {
    this.loadMissions(); // Charger les missions dès le début
    this.loadUsers(); // Charger les utilisateurs dès le début
  }

  // Charger toutes les missions
  loadMissions(): void {
    this.missionService.getAllMissions().subscribe(
      (data) => {
        this.missions = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des missions', error);
      }
    );
  }

  // Charger la liste des utilisateurs
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  // Ouvrir le modal en mode ajout
  /*onAddMission(): void {
    this.selectedMission = { id: 0, title: '', description: '', dateDebut: '', dateLimit: '', user: undefined }; // Initialisation avec une mission vide
    this.isAdding = true; // Passer en mode ajout
    this.isModalOpen = true; // Ouvrir le modal
  }*/

  // Ouvrir le modal en mode modification
  onEditMission(mission: Mission): void {
    this.selectedMission = { ...mission }; // Créer une copie de la mission sélectionnée
    this.isAdding = false; // Passer en mode modification
    this.isModalOpen = true; // Ouvrir le modal
  }

  // Sauvegarder les modifications de la mission (ajout ou modification)
 /* onSaveMission(): void {
    if (this.isAdding) {
      this.addMission(); // Appeler la méthode d'ajout si on est en mode ajout
    } else {
      this.updateMission(); // Appeler la méthode de mise à jour si on est en mode modification
    }
  }

  // Ajouter une nouvelle mission
  /*addMission(): void {
    if (this.selectedMission) {
      this.missionService.addMission(this.selectedMission).subscribe(
        (response) => {
          console.log('Nouvelle mission ajoutée:', response);
          this.loadMissions(); // Recharger la liste des missions après l'ajout
          this.closeModal(); // Fermer le modal
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la mission', error);
        }
      );
    }
  }

  // Modifier une mission existante
  updateMission(): void {
    if (this.selectedMission) {
      this.missionService.updateMission(this.selectedMission.id, this.selectedMission).subscribe(
        (response) => {
          console.log('Mission mise à jour:', response);
          this.loadMissions(); // Recharger la liste des missions après la mise à jour
          this.closeModal(); // Fermer le modal
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la mission', error);
        }
      );
    }
  }

  // Supprimer une mission
  onDeleteMission(id: number): void {
    this.missionService.deleteMission(id).subscribe(
      () => {
        console.log('Mission supprimée');
        this.loadMissions(); // Recharger la liste des missions après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la mission', error);
      }
    );
  }

  // Fermer le modal
  closeModal(): void {
    this.isModalOpen = false;
    // Réinitialiser la mission sélectionnée
    if (this.isAdding) {
      this.selectedMission = { id: 0, title: '', description: '', dateDebut: '', dateLimit: '', user: { id: 0, name: '' } }; // Réinitialiser pour l'ajout
    }
  }*/

    // Initialiser la mission sélectionnée avec un utilisateur par défaut
onAddMission(): void {
  this.selectedMission = { 
    id: 0, 
    title: '', 
    description: '', 
    dateDebut: '', 
    dateLimit: '', 
    userForMission: { id: 0, name: '' } // Initialiser user avec une valeur par défaut
  };
  this.isAdding = true;
  this.isModalOpen = true;
}

// Réinitialiser la mission sélectionnée lors de la fermeture du modal
closeModal(): void {
  this.isModalOpen = false;
  if (this.isAdding) {
    this.selectedMission = { 
      id: 0, 
      title: '', 
      description: '', 
      dateDebut: '', 
      dateLimit: '', 
      userForMission: { id: 0, name: '' } // Réinitialiser user avec une valeur par défaut
    };
  }
}

}
