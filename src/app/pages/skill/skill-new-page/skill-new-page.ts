import { Component, inject } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonContent, IonRow, IonInput, IonTitle, IonItem, IonCheckbox, IonText, IonIcon, IonPopover } from "@ionic/angular/standalone";
import { Skill } from '../../../interfaces/skill';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '../../../services/skill/skill-service';
import { ExperienceService } from '../../../services/experience/experience-service';
import { AsyncPipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

const IonElements = [
  IonInput,
  IonRow,
  IonContent,
  IonGrid,
  IonCol,
  IonButton,
  IonItem,
  IonTitle,
  IonCheckbox,
  IonPopover, 
  IonIcon, 
  IonText 
];

@Component({
  selector: 'app-skill-new-page',
  templateUrl: './skill-new-page.html',
  styleUrls: ['./skill-new-page.scss'],
  imports: [ReactiveFormsModule, AsyncPipe, ...IonElements],
})
export class SkillNewPage {

  protected readonly experiences = inject(ExperienceService).experience$;

  private readonly _skillService = inject(SkillService);

  private formBuilder = inject(FormBuilder);

  //TODO au cas où il n'y a pas plus de champ à mettre, enlever un form group
  skillForm = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    experiencesID: new FormControl<number[]>([])
  });

  // TODO : expID doit être exp.uuid en string et non number
  onCheckboxChange(expID: number, checked: boolean) {
    const selectedExp = [...(this.skillForm.controls.experiencesID.value ?? [])];

    if (checked) {
      if (!selectedExp.includes(expID)) {
        selectedExp.push(expID);
      }
    } else {
      const index = selectedExp.indexOf(expID);
      if (index > -1) {
        selectedExp.splice(index, 1);
      }
    }

    this.skillForm.controls.experiencesID.setValue(selectedExp);
    
  }


  async handleAddSkill() {
    const newSkill: Skill = {
      uuid: uuidv4(),
      title: this.skillForm.value.title,
      category: this.skillForm.value.category,
      description: this.skillForm.value.description,
      experiencesID: this.skillForm.value.experiencesID
    };

    console.log(newSkill);

    //await this._skillService.addSkill(newSkill);
  }
}
