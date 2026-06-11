import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonTitle, IonCol, IonItem, IonInput, IonCardHeader, IonCard, IonText, IonCardContent } from '@ionic/angular/standalone';
import { Skill } from '../../../interfaces/skill';

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
  IonCardHeader 
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

  ngOnInit(): void {
    const skill = this.route.snapshot.data['skillDetailsResolver'];    
    this.skillDetails.set(skill);
  }
}
