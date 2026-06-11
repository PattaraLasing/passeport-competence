import { Component, inject } from '@angular/core';
import { IonContent, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonGrid, IonRow, IonCol, IonTitle, IonLabel, IonSegmentButton, IonSegment, IonSegmentView, IonSegmentContent } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '../../../services/skill/skill-service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

const IonElements = [
  IonCol,
  IonRow,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent
];

@Component({
  selector: 'app-skill-page',
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, ...IonElements],
  templateUrl: './skill-page.html',
  styleUrls: ['./skill-page.scss'],
})
export class SkillPage {

  protected selectedCategory$ = new BehaviorSubject<string>('hard-skill');

  protected readonly skills = combineLatest([inject(SkillService).skill$, this.selectedCategory$]).pipe(
    map(([skills, category]) =>
      skills.filter(skill => skill.category === category)
    )
  );

  getSelectedDisplayed(event: CustomEvent) {
    this.selectedCategory$.next(event.detail.value);
  }
}
