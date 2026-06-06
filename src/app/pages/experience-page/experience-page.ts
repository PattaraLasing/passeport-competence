import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header, Star, Evidence, Experience, EvidenceStorage } from '../../interfaces/experience';
import { IonContent, IonButton, IonInput, IonGrid, IonRow, IonList, IonItem, IonTextarea, IonIcon } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
import { ExperienceService } from '../../services/experience/experience-service';
import { AsyncPipe } from '@angular/common';
import { GetEvidenceFileURLPipe } from "../../pipes/getEvidenceFileURL/get-evidence-file-url-pipe";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-experience-page',
  imports: [IonIcon, IonItem, IonList, AsyncPipe, ReactiveFormsModule, IonContent, IonButton, IonInput, RouterLink, IonGrid, IonRow, GetEvidenceFileURLPipe, IonTextarea],
  templateUrl: './experience-page.html',
  styleUrl: './experience-page.scss',
})
export class ExperiencePage {

  private readonly _experienceService = inject(ExperienceService);

  private formBuilder = inject(FormBuilder);
  private evidenceStorage: EvidenceStorage | undefined = undefined;
  private selectedFile: File | null = null;

  protected readonly experiences = this._experienceService.experience$;

  protected showExpForm: boolean = false;

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

  evidencesForm = this.formBuilder.group({
    name: [''],
    description: ['']
  });

  displayExpForm(show: boolean) {
    this.showExpForm = show;
  }

  handleLoadExperience() {
    this._experienceService.loadExperience();
  }

  async handleAddExperience() {
    const expUUID = uuidv4();
    
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

    const evidence: Evidence = {
      name: this.evidencesForm.value.name,
      description: this.evidencesForm.value.description,
      fileUUID: this.evidenceStorage?.fileUUID
    }

    const experience: Experience = {
      uuid: expUUID,
      header: header,
      star: star,
      evidence: [evidence]
    }

    await this._experienceService.addExperience(experience, this.evidenceStorage);
  }

 onEvidenceFileSelected($event: Event) {
    const uuid = uuidv4();
    const files = ($event?.target as HTMLInputElement).files;
    this.selectedFile = files?.[0] ?? null;

    this.evidenceStorage = {
      fileUUID: uuid,
      file: this.selectedFile
    }
  }

}
