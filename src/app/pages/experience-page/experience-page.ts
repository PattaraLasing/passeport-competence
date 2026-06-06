import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header, Star, Evidence, Experience } from '../../interfaces/experience';
import { IonContent, IonButton, IonInput, IonGrid, IonRow, IonList, IonItem, IonTextarea } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';
import { ExperienceService } from '../../services/experience/experience-service';
import { AsyncPipe } from '@angular/common';
import { GetEvidenceFileURLPipe } from "../../pipes/getEvidenceFileURL/get-evidence-file-url-pipe";

@Component({
  selector: 'app-experience-page',
  imports: [IonItem, IonList, AsyncPipe, ReactiveFormsModule, IonContent, IonButton, IonInput, RouterLink, IonGrid, IonRow, GetEvidenceFileURLPipe, IonTextarea],
  templateUrl: './experience-page.html',
  styleUrl: './experience-page.scss',
})
export class ExperiencePage {

  private readonly _experienceService = inject(ExperienceService);

  private formBuilder = inject(FormBuilder);

  protected readonly experiences = this._experienceService.experience$;

  protected showExpForm: boolean = false;

  experienceForm = this.formBuilder.group({
    id: [''],
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
    }),
    evidence: this.formBuilder.group({
      id: [''],
      genre: [''],
      name: [''],
      description: ['']
    })
  }); 

  displayExpForm(show: boolean) {
    this.showExpForm = show;
  }

  handleLoadExperience() {
    this._experienceService.loadExperience();
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

    const evidence: Evidence = {
      id: 'test-save-evidence-firebase-id',
      genre: this.experienceForm.value.evidence?.genre,
      name: this.experienceForm.value.evidence?.name,
      description: this.experienceForm.value.evidence?.description,
      mediaRefURL: ''
    }
    
    const experience: Experience = {
      uuid: 'test-save-exp-firebase-uuid',
      header: header,
      star: star,
      evidence: [evidence]
    }

    console.log(experience);
    await this._experienceService.addExperience(experience);
  }

  async handleFileToUpload($event: any) {
    const file = $event.target.files[0]; 
    await this._experienceService.uploadEvidenceFile(file);
  }

}
