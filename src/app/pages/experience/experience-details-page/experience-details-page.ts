import { Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonTextarea, IonCard, IonCardHeader, IonCardContent, IonTitle, IonLabel, IonSegmentButton, IonSegment, IonSegmentView, IonSegmentContent, IonText } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Experience } from '../../../interfaces/experience';
import { GetEvidenceFileURLPipe } from '../../../pipes/getEvidenceFileURL/get-evidence-file-url-pipe';

const IonElements = [
  IonContent,
  IonGrid,
  IonRow,
  IonItem,
  IonCard,
  IonInput,
  IonCardHeader,
  IonCardContent,
  IonTextarea,
  IonText, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonTitle, 
  IonCol, 
  IonSegmentView, 
  IonSegmentContent
];

@Component({
  selector: 'app-experience-details-page',
  templateUrl: './experience-details-page.html',
  styleUrls: ['./experience-details-page.scss'],
  imports: [AsyncPipe, GetEvidenceFileURLPipe, ...IonElements],
})
export class ExperienceDetailsPage implements OnInit {

  protected readonly route = inject(ActivatedRoute);
  protected readonly experienceDetails = signal<Experience | undefined>(undefined);

  ngOnInit(): void {
    const expDetails = this.route.snapshot.data['expDetailsResolver'];
    this.experienceDetails.set(expDetails);
  }
}
