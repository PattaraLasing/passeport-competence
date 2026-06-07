import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header, Star, Evidence, Experience } from '../../interfaces/experience';
import { IonContent, IonButton, IonInput, IonGrid, IonRow, IonList, IonItem, IonTextarea, IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCol } from "@ionic/angular/standalone";
import { ExperienceService } from '../../services/experience/experience-service';
import { AsyncPipe } from '@angular/common';
import { GetEvidenceFileURLPipe } from "../../pipes/getEvidenceFileURL/get-evidence-file-url-pipe";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-experience-page',
  imports: [IonCol, IonCardTitle, IonCardContent, IonCardHeader, IonIcon, IonItem, IonList, AsyncPipe, ReactiveFormsModule, IonContent, IonButton, IonInput, IonGrid, IonRow, GetEvidenceFileURLPipe, IonTextarea, IonCard],
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

  handleLoadExperience() {
    this._experienceService.loadExperience();
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
