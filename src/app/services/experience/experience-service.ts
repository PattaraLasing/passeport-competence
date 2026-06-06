import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, query, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Experience } from '../../interfaces/experience';
import { ref, uploadBytes, Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {

  private readonly _fireStore = inject(Firestore);
  private readonly _storage = inject(Storage);
  private readonly _experience$ = new BehaviorSubject<Experience[]>([]);

  public readonly experience$ = this._experience$.asObservable();

  loadExperience() {
    const colRef = collection(this._fireStore, 'experience-list');
    const q = query(colRef);
    const data$ = collectionData(q, { idField: 'uuid' }) as Observable<Experience[]>;
    return data$.subscribe((data) => {
      this._experience$.next(data);
    });
  }

  async addExperience(experience: Experience) {

    await this.uploadEvidenceFile(experience);

    const docRef = doc(this._fireStore, 'experience-list/' + experience.uuid);
    await setDoc(docRef, experience).catch(error => {
      console.log('error firebase : ' + error);
    });

  }

  private async uploadEvidenceFile(experience: Experience) {
    if (experience.evidences) {
      for (const evidence of experience.evidences) {
        const fileRef = ref(this._storage, evidence.fileUUID!);
        const result = await uploadBytes(fileRef, evidence.fileStorage!);
        evidence.fileRefURL = result.ref.toString();
        evidence.fileStorage = null; //remove file from Evidence after
      }
    }
  }

}
