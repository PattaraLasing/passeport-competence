import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, query, setDoc } from '@angular/fire/firestore';
import { Skill } from '../../interfaces/skill';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillService {

  private readonly _fireStore = inject(Firestore);
  private readonly _skill$ = new BehaviorSubject<Skill[]>([]);

  public readonly skill$ = this._skill$.asObservable();

  constructor() {
    this.loadSkill();
  }

  loadSkill() {
    const colRef = collection(this._fireStore, 'skill-list');
    const q = query(colRef);
    const data$ = collectionData(q, {idField: 'uuid'}) as Observable<Skill[]>;
    return data$.subscribe((data) => {
      console.log('--------------->', data);
      this._skill$.next(data);
    });
  }

  async addSkill(skill: Skill) {
    const docRef = doc(this._fireStore, 'skill-list/' + skill.uuid);
    await setDoc(docRef, skill).catch(error => {
      console.log('error firebase : ' + error);   
    });
  }

}
