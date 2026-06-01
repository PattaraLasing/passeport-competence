import { Component, inject, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill/skill-service';
import { IonContent, IonButton, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonGrid, IonRow, IonCol } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-skill-page',
  imports: [AsyncPipe, IonCol, IonRow, IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonContent],
  templateUrl: './skill-page.html',
  styleUrls: ['./skill-page.scss'],
})
export class SkillPage implements OnInit {

  private readonly _skillService = inject(SkillService);
  
  protected readonly skills = this._skillService.skill$;

  ngOnInit(): void {
    
  }

  async handleAddSkill() {    
    await this._skillService.addSkill({
      uuid: 'uuid-test',
      category: 'category-test',
      title: 'my first skill',
      description: 'this is my first skill to firebase'
    })
  }

  handleLoadSkill() {
    this._skillService.loadSkill();
  }
}
