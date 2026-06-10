import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

const IonElements = [
  IonContent
];

@Component({
  selector: 'app-skill-details-page',
  imports: [...IonElements],
  templateUrl: './skill-details-page.html',
  styleUrls: ['./skill-details-page.scss'],
})
export class SkillDetailsPage {}
