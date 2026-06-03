import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, query, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Experience } from '../../interfaces/experience';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {

  private readonly _fireStor = inject(Firestore);
  private readonly _experience$ = new BehaviorSubject<Experience[]>([]);

  public readonly experience$ = this._experience$.asObservable();

  async addExperience(experience: Experience) {
    const id = uuidv4();
    const docRef = doc(this._fireStor, 'experience-list/' + id);
    await setDoc(docRef, experience).catch(error => {
      console.log('error firebase : ' + error);
      
    });
  }

  loadExperience() {
    const colRef = collection(this._fireStor, 'experience-list');
    const q = query(colRef);
    const data$ = collectionData(q, {idField: 'uuid'}) as Observable<Experience[]>;
    return data$.subscribe((data) => {
      console.log('----------------->', data);
      this._experience$.next(data);
    });
  }
}
