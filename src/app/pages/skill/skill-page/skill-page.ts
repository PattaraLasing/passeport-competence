import { Component, inject } from '@angular/core';
import { IonContent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonGrid, IonRow, IonCol, IonTitle } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '../../../services/skill/skill-service';
import { RouterLink } from '@angular/router';

const IonElements = [
  IonCol, 
  IonRow, 
  IonGrid, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonContent,
  IonTitle
];

@Component({
  selector: 'app-skill-page',
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, ...IonElements],
  templateUrl: './skill-page.html',
  styleUrls: ['./skill-page.scss'],
})
export class SkillPage {

  protected readonly skills = inject(SkillService).skill$;

}
