import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonTitle, IonCol, IonItem, IonInput, IonCardHeader, IonCard, IonText, IonCardContent, IonChip } from '@ionic/angular/standalone';
import { CATEGORIES_SKILLS, Skill } from '../../../interfaces/skill';

const IonElements = [
  IonContent,
  IonGrid, 
  IonRow, 
  IonTitle, 
  IonCol, 
  IonItem, 
  IonInput,
  IonCardContent, 
  IonText, 
  IonCard, 
  IonCardHeader,
  IonChip
];

@Component({
  selector: 'app-skill-details-page',
  imports: [...IonElements],
  templateUrl: './skill-details-page.html',
  styleUrls: ['./skill-details-page.scss'],
})
export class SkillDetailsPage implements OnInit {

  protected readonly route = inject(ActivatedRoute);
  protected readonly skillDetails = signal<Skill | undefined>(undefined);
  protected categoryLabel: string | undefined;

  ngOnInit(): void {
    const skill : Skill = this.route.snapshot.data['skillDetailsResolver'];
    this.skillDetails.set(skill);
    this.categoryLabel = CATEGORIES_SKILLS.find(category => category.id === skill.category)?.label;
  }
}
