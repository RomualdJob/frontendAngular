import { UserForMission } from "./UserForMission.model";
export class Mission {
  id: number;
  title: string;
  description: string;
  dateDebut: string;
  dateLimit: string;
  //user?: User;  // Ajout de l'utilisateur
  userForMission?: UserForMission; 
 // Ajout de l'utilisateur

  constructor(id: number, title: string, description: string, dateDebut: string, dateLimit: string, userForMission?: UserForMission) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dateDebut = dateDebut;
    this.dateLimit = dateLimit;
    this.userForMission = this.userForMission;
  }
}
