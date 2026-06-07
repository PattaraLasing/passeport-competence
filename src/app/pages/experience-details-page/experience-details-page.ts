import { Component, inject, OnInit, signal } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonInput, IonTextarea, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { GetEvidenceFileURLPipe } from "../../pipes/getEvidenceFileURL/get-evidence-file-url-pipe";
import { ActivatedRoute } from '@angular/router';
import { Experience } from '../../interfaces/experience';

const IonElements = [
  IonContent,
  IonGrid,
  IonRow,
  IonList,
  IonItem,
  IonCard,
  IonInput,
  IonIcon,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonTextarea
];

@Component({
  selector: 'app-experience-details-page',
  templateUrl: './experience-details-page.html',
  styleUrls: ['./experience-details-page.scss'],
  imports: [AsyncPipe, GetEvidenceFileURLPipe, ...IonElements],
})
export class ExperienceDetailsPage implements OnInit {

  protected readonly route = inject(ActivatedRoute);
  protected readonly experienceDetails = signal<Experience|undefined>(undefined);
  
  ngOnInit() : void {
    const expDetails = this.route.snapshot.data['expDetailsResolver'];
    this.experienceDetails.set(expDetails);
  }
}
