import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
    console.log(this.experienceForm.value);
    console.log(this.experienceForm.valid);
  }

}
