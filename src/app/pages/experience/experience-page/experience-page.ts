import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonInput, IonGrid, IonRow, IonList, IonItem, IonTextarea, IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCol, IonTitle } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { RouterLink } from '@angular/router';
import { Header, Star, Experience, Evidence } from '../../../interfaces/experience';
import { ExperienceService } from '../../../services/experience/experience-service';

const IonElements = [
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonCard,
  IonInput,
  IonIcon,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonTextarea,
  IonButton,
  IonTitle
];

@Component({
  selector: 'app-experience-page',
  imports: [RouterLink, AsyncPipe, ReactiveFormsModule, ...IonElements],
  templateUrl: './experience-page.html',
  styleUrl: './experience-page.scss',
})
export class ExperiencePage {

  private readonly _experienceService = inject(ExperienceService);

  private formBuilder = inject(FormBuilder);

  protected readonly experiences = this._experienceService.experience$;

  protected showExpForm: boolean = false;

  evidencesForm: FormGroup;

  experienceForm = this.formBuilder.group({
    header: this.formBuilder.group({
      title: ['', Validators.required],
      date: [''],
      location: [''],
      participants: ['']
    }),
    star: this.formBuilder.group({
      situation: ['', Validators.required],
      task: ['', Validators.required],
      action: ['', Validators.required],
      result: ['', Validators.required],
    })
  });

  constructor() {
    this.evidencesForm = this.formBuilder.group({
      evidences: this.formBuilder.array([])
    });
  }

  get evidences(): FormArray {
    return this.evidencesForm.get('evidences') as FormArray;
  }

  displayExpForm(show: boolean) {
    this.showExpForm = show;
  }

  addEvidenceForm() {
    this.evidences.push(
      this.formBuilder.group({
        fileUUID: [''],
        name: [''],
        description: [''],
        fileStorage: [null]
      })
    )
  }

  removeEvidenceForm(index: number) {
    this.evidences.removeAt(index);
  }

  async handleAddExperience() {
    const header: Header = {
      title: this.experienceForm.value.header?.title,
      date: this.experienceForm.value.header?.date,
      location: this.experienceForm.value.header?.location,
      participants: this.experienceForm.value.header?.participants
    };

    const star: Star = {
      situation: this.experienceForm.value.star?.situation,
      task: this.experienceForm.value.star?.task,
      action: this.experienceForm.value.star?.action,
      result: this.experienceForm.value.star?.result
    };

    const experience: Experience = {
      uuid: uuidv4(),
      header: header,
      star: star,
      evidences: this.evidences.value as Evidence[]
    }

    await this._experienceService.addExperience(experience);
  }

  onEvidenceFileSelected($event: Event, index: number) {
    const uuid = uuidv4();
    const files = ($event?.target as HTMLInputElement).files;
    const selectedFile = files?.[0] ?? null;
    this.evidences.at(index).get('fileUUID')?.patchValue(uuid);
    this.evidences.at(index).get('fileStorage')?.patchValue(selectedFile);
  }

}
