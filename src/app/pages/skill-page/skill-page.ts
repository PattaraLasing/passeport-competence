import { Component, inject, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill/skill-service';
import { IonContent, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonGrid, IonRow, IonCol, IonInput } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Skill } from '../../interfaces/skill';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skill-page',
  imports: [RouterLink, ReactiveFormsModule, IonInput, AsyncPipe, IonCol, IonRow, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonContent],
  templateUrl: './skill-page.html',
  styleUrls: ['./skill-page.scss'],
})
export class SkillPage implements OnInit {

  private readonly _skillService = inject(SkillService);

  private formBuilder = inject(FormBuilder);

  protected readonly skills = this._skillService.skill$;

  //TODO au cas où il n'y a pas plus de champ à mettre, enlever un form group
  newSkillForm = this.formBuilder.group({
    newSkill: this.formBuilder.group({
      id: [''],
      title: [''],
      category: [''],
      description: ['']
    })
  });

  ngOnInit(): void {

  }

  async handleAddSkill() {
    const newSkill: Skill = {
      uuid: '001-test-input-form',
      title: this.newSkillForm.value.newSkill?.title,
      category: this.newSkillForm.value.newSkill?.category,
      description: this.newSkillForm.value.newSkill?.description,
    };

    await this._skillService.addSkill(newSkill)
  }

  handleLoadSkill() {
    this._skillService.loadSkill();
  }
}
