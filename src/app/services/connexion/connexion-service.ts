import { inject, Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, User } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {

  private readonly _fireStore = inject(Firestore);
  private readonly _auth = inject(Auth);

  public readonly user$ = authState(this._auth);
  //public readonly userProfile$ = this.getUserProfile();

  getUserProfile() {    
    return this.user$.pipe(
      switchMap((user) => {
        const docRef = doc(this._fireStore, 'users-coffrexp/' + user?.uid);
        return docData(docRef) as Observable<User>;
      })
    );
  }

  async saveUserDate(data: User) {
    console.log(data);
    
    const docRef = doc(this._fireStore, 'users-coffrexp/' + data.uid);
    await setDoc(docRef, {
      email: data.email,
      displayName: data.displayName
    })
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this._auth, provider);
    console.log("user : " + result.user.email);
    console.log("user : " + result.user.displayName);
    console.log("providerId : " + result.providerId); 
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(this._auth, email, password);
    console.log("user : " + result.user.email);
    console.log("user : " + result.user.displayName);
    console.log("providerId : " + result.providerId); 
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this._auth, email, password);
    console.log("user : " + result.user.email);
    console.log("user : " + result.user.displayName);
    console.log("providerId : " + result.providerId);
  }

  async signInAnonymously() {
    const result = await signInAnonymously(this._auth);
    console.log("user : " + result.user.uid);
    console.log("user : " + result.user.email);
    console.log("user : " + result.user.displayName);
    console.log("providerId : " + result.providerId);
  }

  async logout() {
    await signOut(this._auth);
  }

}
