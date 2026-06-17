import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, query, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Experience } from '../../interfaces/experience';
import { ref, uploadBytes, Storage } from '@angular/fire/storage';

import experienceMock from '../../../../public/mocks/experience.json';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {

  private readonly _fireStore = inject(Firestore);
  private readonly _storage = inject(Storage);
  private readonly _experience$ = new BehaviorSubject<Experience[]>([]);

  public readonly experience$ = this._experience$.asObservable();

  constructor() {
    this.loadExperiences();
  }

  loadExperiences() {

    //MOCK
    //return this._experience$.next([experienceMock, experienceMock, experienceMock]);

    const colRef = collection(this._fireStore, 'experience-list');
    const q = query(colRef);
    const data$ = collectionData(q, { idField: 'uuid' }) as Observable<Experience[]>;
    //TODO : améliorer le .subscribe - utilise data$ directement avec behavior subject
    // (ou demande à IA pour refactoriser le code sans subscribe)
    return data$.subscribe((data) => {
      this._experience$.next(data);
    });

  }

  async getExperiencesByIDs(ids: string[]): Promise<Experience[]> {
    let experiences: Experience[] = [];
    for (let uuid of ids) {
      const exp = await this.getExperienceById(uuid);
      experiences.push(exp);
    }
    return experiences;
  }

  async getExperienceById(uuid: string): Promise<Experience>{
    
    //MOCK
    //return experienceMock;

    const docRef = doc(this._fireStore, 'experience-list/' + uuid);
    const result = await getDoc(docRef);
    const data = result.data() as Experience
    return {...data, uuid: result.id}
  }

  async addExperience(experience: Experience) {

    await this.uploadEvidenceFile(experience);

    //TODO : GLOBAL EXCEPTION HANDLER
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

        //remove file from Evidence after upload
        //TODO - il est peut être mieux de gérer autrement le fichier que de mettre à null ....
        //....c'est ok pour l'instant avec Firebase
        evidence.fileStorage = null;
      }
    }
  }

}
