import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonTitle, IonCol } from '@ionic/angular/standalone';
import { Skill } from '../../../interfaces/skill';

const IonElements = [
  IonContent
];

@Component({
  selector: 'app-skill-details-page',
  imports: [...IonElements, IonGrid, IonRow, IonTitle, IonCol],
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
