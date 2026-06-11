import { Component, inject } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCard, IonCardHeader, IonCardTitle, IonCol, IonTitle } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExperienceService } from '../../../services/experience/experience-service';

const IonElements = [
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonTitle
];

@Component({
  selector: 'app-experience-page',
  imports: [RouterLink, AsyncPipe, ...IonElements],
  templateUrl: './experience-page.html',
  styleUrl: './experience-page.scss',
})
export class ExperiencePage {

  protected readonly experiences = inject(ExperienceService).experience$;

}
