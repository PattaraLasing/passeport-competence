import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonGrid, IonRow, IonTitle, IonCol, IonItem, IonInput, IonCardHeader, IonCard, IonText, IonChip } from '@ionic/angular/standalone';
import { CATEGORIES_SKILLS, Skill } from '../../../interfaces/skill';
import { Experience } from '../../../interfaces/experience';
import { ExperienceService } from '../../../services/experience/experience-service';

const IonElements = [
  IonContent,
  IonGrid, 
  IonRow, 
  IonTitle, 
  IonCol, 
  IonItem, 
  IonInput,
  IonText, 
  IonCard, 
  IonCardHeader,
  IonChip
];

@Component({
  selector: 'app-skill-details-page',
  imports: [RouterLink, ...IonElements],
  templateUrl: './skill-details-page.html',
  styleUrls: ['./skill-details-page.scss'],
})
export class SkillDetailsPage implements OnInit {

  private readonly _experienceService = inject(ExperienceService);

  protected readonly route = inject(ActivatedRoute);
  protected readonly skillDetails = signal<Skill | undefined>(undefined);
  protected categoryLabel: string | undefined;
  protected experiences: Experience[] = [];

  ngOnInit() {
    const skill : Skill = this.route.snapshot.data['skillDetailsResolver'];
    this.skillDetails.set(skill);
    this.categoryLabel = CATEGORIES_SKILLS.find(category => category.id === skill.category)?.label;

    const expIds = skill.experiencesID;
    if (expIds) {
      this.getExperiences(expIds);
    }
  }

  async getExperiences(expIds: string[]) {
    this.experiences = await this._experienceService.getExperiencesByIDs(expIds);
  }

}
