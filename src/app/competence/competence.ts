import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evidence, Experience, Header, Star } from '../interfaces/experience';

@Component({
  selector: 'app-competence',
  imports: [ReactiveFormsModule],
  templateUrl: './competence.html',
  styleUrl: './competence.scss',
})
export class Competence {

  private formBuilder = inject(FormBuilder);

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

  saveExperience(): void {  
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
      genre: this.experienceForm.value.evidence?.genre,
      name: this.experienceForm.value.evidence?.name,
      description: this.experienceForm.value.evidence?.description
    }
    
    const experience: Experience = {
      id: '001',
      header: header,
      star: star,
      evidence: evidence
    }

    console.log(experience);
    
  }

}
