import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, query, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { EvidenceStorage, Experience } from '../../interfaces/experience';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL, Storage, StorageReference, getStorage } from '@angular/fire/storage';

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

  async addExperience(experience: Experience, evidenceStorage?: EvidenceStorage) {

    if (evidenceStorage) {
      const fileRefURL: string = await this.uploadEvidenceFile(evidenceStorage);
      const evidence = experience.evidence?.find((evidence) => evidence.fileUUID == evidenceStorage.fileUUID);
      if (evidence) {
        evidence.fileRefURL = fileRefURL;
      }
    }

    const docRef = doc(this._fireStore, 'experience-list/' + experience.uuid);
    await setDoc(docRef, experience).catch(error => {
      console.log('error firebase : ' + error);
    });
  }

  private async uploadEvidenceFile(evidenceStorage: EvidenceStorage): Promise<string> {
    //upload file to Storage
    const filePath = evidenceStorage.fileUUID!;
    const fileRef = ref(this._storage, filePath);
    const result = await uploadBytes(fileRef, evidenceStorage.file!);

    //return fileRefURL after upload
    return result.ref.toString();
  }

}
