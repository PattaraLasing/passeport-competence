import { Component, inject } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonContent, IonRow, IonInput, IonTitle, IonItem } from "@ionic/angular/standalone";
import { Skill } from '../../../interfaces/skill';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '../../../services/skill/skill-service';

const IonElements = [
  IonInput,
  IonRow,
  IonContent,
  IonGrid,
  IonCol,
  IonButton,
  IonItem, 
  IonTitle
];

@Component({
  selector: 'app-skill-new-page',
  templateUrl: './skill-new-page.html',
  styleUrls: ['./skill-new-page.scss'],
  imports: [ReactiveFormsModule, ...IonElements],
})
export class SkillNewPage {

  private readonly _skillService = inject(SkillService);

  private formBuilder = inject(FormBuilder);

  //TODO au cas où il n'y a pas plus de champ à mettre, enlever un form group
  skillForm = this.formBuilder.group({
    newSkill: this.formBuilder.group({
      id: [''],
      title: [''],
      category: [''],
      description: ['']
    })
  });

  async handleAddSkill() {
    const newSkill: Skill = {
      uuid: '001-test-input-form',
      title: this.skillForm.value.newSkill?.title,
      category: this.skillForm.value.newSkill?.category,
      description: this.skillForm.value.newSkill?.description,
    };

    console.log(newSkill);
    

    //await this._skillService.addSkill(newSkill);
  }
}
