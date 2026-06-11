import { Component, inject } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonContent, IonRow, IonInput, IonTitle, IonItem, IonCheckbox, IonText, IonIcon, IonPopover, IonRadio, IonRadioGroup } from "@ionic/angular/standalone";
import { CATEGORIES_SKILLS, Skill } from '../../../interfaces/skill';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '../../../services/skill/skill-service';
import { ExperienceService } from '../../../services/experience/experience-service';
import { AsyncPipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

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
  IonText,
  IonRadio,
  IonRadioGroup
];

@Component({
  selector: 'app-skill-new-page',
  templateUrl: './skill-new-page.html',
  styleUrls: ['./skill-new-page.scss'],
  imports: [ReactiveFormsModule, AsyncPipe, ...IonElements],
})
export class SkillNewPage {

  protected readonly experiences = inject(ExperienceService).experience$;
  protected readonly categories = CATEGORIES_SKILLS;

  private readonly _skillService = inject(SkillService);
  private readonly _router = inject(Router);

  private formBuilder = inject(FormBuilder);

  skillForm = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl(''),
    category: new FormControl('hard-skill', {nonNullable: true}),
    description: new FormControl(''),
    experiencesID: new FormControl<string[]>([])
  });

  onCheckboxChange(expID: string, checked: boolean) {
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

    try {
      await this._skillService.addSkill(newSkill);
      await this._router.navigate(['/skills']);
    } catch (error) {
      console.error('Erreur lors de la création Compétence : ', error);
    }
  }
}
