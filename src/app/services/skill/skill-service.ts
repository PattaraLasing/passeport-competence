import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Skill } from '../../interfaces/skill';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class SkillService {

  private readonly _fireStore = inject(Firestore);

  async addSkill(skill: Skill) {
    const id = uuidv4();
    const docRef = doc(this._fireStore, 'skill-list/' + id);
    await setDoc(docRef, skill).catch(error => {
      console.log('error firebase : ' + error);   
    });
  }

}
