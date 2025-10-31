import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Freelance {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  level: string;
  skills: string[];
  location: string;
  rate: string;
  description: string;
  available: boolean;
  projects: number;
  phone?: string;
}

@Component({
  selector: 'app-freelancer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './freelancer-list.component.html',
  styleUrls: ['./freelancer-list.component.scss']
})
export class FreelancerListComponent {
  searchTerm: string = '';
  selectedSkill: string = '';
  selectedLevel: string = '';
  showModal: boolean = false;
  selectedFreelance: Freelance | null = null;
  
  freelances: Freelance[] = [
    {
      id: 1,
      name: 'Stéfin C',
      title: 'Développeur Full Stack',
      rating: 5.0,
      reviews: 15,
      level: 'Senior',
      skills: ['JavaScript', 'Angular', 'Node.js', 'MongoDB', 'TypeScript', 'Express'],
      location: 'Paris, France',
      rate: '85€',
      description: 'Expert en développement d\'applications web modernes avec 8 ans d\'expérience.',
      available: true,
      projects: 47,
      phone: '+33 6 12 34 56 78'
    },
    {
      id: 2,
      name: 'Marie L',
      title: 'Designer UI/UX',
      rating: 4.9,
      reviews: 23,
      level: 'Expert',
      skills: ['Figma', 'Adobe XD', 'Prototypage', 'Design System', 'User Research', 'Wireframing'],
      location: 'Lyon, France',
      rate: '75€',
      description: 'Designer passionnée par la création d\'expériences utilisateur mémorables.',
      available: true,
      projects: 32,
      phone: '+33 6 23 45 67 89'
    },
    {
      id: 3,
      name: 'Thomas B',
      title: 'Développeur Frontend',
      rating: 4.8,
      reviews: 8,
      level: 'Intermediate',
      skills: ['React', 'Vue.js', 'TypeScript', 'SASS', 'Redux', 'Jest'],
      location: 'Toulouse, France',
      rate: '65€',
      description: 'Spécialiste frontend avec une forte attention aux détails et aux performances.',
      available: true,
      projects: 18,
      phone: '+33 6 34 56 78 90'
    },
    // ... (ajoutez les autres freelances avec leurs numéros)
  ];

  filteredFreelances = [...this.freelances];

  // Récupérer toutes les compétences uniques
  get allSkills(): string[] {
    const allSkills = this.freelances.flatMap(f => f.skills);
    return [...new Set(allSkills)].sort();
  }

  // Récupérer tous les niveaux uniques
  get allLevels(): string[] {
    const levels = this.freelances.map(f => f.level);
    return [...new Set(levels)];
  }

  filterFreelances(): void {
    this.filteredFreelances = this.freelances.filter(freelance => {
      const matchesSearch = !this.searchTerm || 
        freelance.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelance.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelance.skills.some(skill => 
          skill.toLowerCase().includes(this.searchTerm.toLowerCase())
        ) ||
        freelance.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesSkill = !this.selectedSkill || 
        freelance.skills.includes(this.selectedSkill);
      
      const matchesLevel = !this.selectedLevel || 
        freelance.level === this.selectedLevel;
      
      return matchesSearch && matchesSkill && matchesLevel;
    });
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedSkill = '';
    this.selectedLevel = '';
    this.filteredFreelances = [...this.freelances];
  }

  // Ouvrir le modal de contact
  openContactModal(freelance: Freelance): void {
    this.selectedFreelance = freelance;
    this.showModal = true;
    // Empêcher le défilement de la page
    document.body.style.overflow = 'hidden';
  }

  // Fermer le modal
  closeModal(): void {
    this.showModal = false;
    this.selectedFreelance = null;
    // Rétablir le défilement
    document.body.style.overflow = 'auto';
  }

  // Méthode pour raccourcir la localisation
getShortLocation(location: string): string {
  if (location.includes(',')) {
    return location.split(',')[0];
  }
  return location.length > 12 ? location.substring(0, 10) + '...' : location;
}

  // Copier le numéro de téléphone
  copyPhoneNumber(): void {
    const phoneNumber = this.selectedFreelance?.phone || '+33 6 12 34 56 78';
    navigator.clipboard.writeText(phoneNumber).then(() => {
      // Vous pouvez ajouter une notification de succès ici
      alert('Numéro copié dans le presse-papier !');
    });
  }
}