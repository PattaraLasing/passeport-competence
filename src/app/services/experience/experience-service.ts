import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, query, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Experience } from '../../interfaces/experience';
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
      console.log('----------------->', data);
      this._experience$.next(data);
    });
  }

  async addExperience(experience: Experience) {
    const id = uuidv4();
    const docRef = doc(this._fireStore, 'experience-list/' + id);
    await setDoc(docRef, experience).catch(error => {
      console.log('error firebase : ' + error);

    });
  }

  async uploadEvidenceFile(file: File) {
    //upload file to Storage
    const filePath = uuidv4();
    const fileRef = ref(this._storage, filePath);
    const result = await uploadBytes(fileRef, file);

    //save file reference to 'evidence-file' collection in FireStore
    const docID = uuidv4();
    const docRef = doc(this._fireStore, 'evidence-file/' + docID);
    await setDoc(docRef, {
      evidenceFileRef: result.ref.toString(),
      description: "test-file-storage"
    });
    
    //const url = await getDownloadURL(result.ref);
  }

}
