import { Component, inject, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill/skill-service';
import { IonContent, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-skill-page',
  imports: [IonButton, IonContent],
  templateUrl: './skill-page.html',
  styleUrls: ['./skill-page.scss'],
})
export class SkillPage implements OnInit {

  private readonly _skillService = inject(SkillService);

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
