import { Component, inject } from '@angular/core';
import { SkillService } from '../../services/skill/skill-service';
import { IonContent, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-skill-page',
  imports: [IonButton, IonContent],
  templateUrl: './skill-page.html',
  styleUrls: ['./skill-page.scss'],
})
export class SkillPage  {

  private readonly _skillService = inject(SkillService);

  async handleAddSkill() {
    //console.log('coucou');
    
    await this._skillService.addSkill({
      uuid: 'uuid-test',
      category: 'category-test',
      title: 'my first skill',
      description: 'this is my first skill to firebase'
    })
  }
}
