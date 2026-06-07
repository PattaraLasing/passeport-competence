import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonContent, IonGrid, IonInput, IonRow } from "@ionic/angular/standalone";
import { firstValueFrom } from 'rxjs';
import { ConnexionService } from '../../services/connexion/connexion-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.html',
  styleUrls: ['./profil-page.scss'],
  imports: [AsyncPipe, IonInput, IonRow, IonGrid, IonButton, IonContent, ReactiveFormsModule],
})
export class ProfilPage implements OnInit {
  private readonly _connexionService = inject(ConnexionService);

  public readonly user$ = this._connexionService.user$; //objet User de auth 
  public readonly userProfile$ = this._connexionService.getUserProfile(); //data enregistré dans la collection 'users-coffrexp'

  public readonly emailPasswordForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  });

  ngOnInit() {}
  
  async handleSignInWithGoogle() {
    await this._connexionService.signInWithGoogle();
    this.handleSaveUserDate();
  }

  //TODO à gérer les valeurs required
  //et l'affichage de saisie email password
  async handleSignInWithEmailAndPassword() {
    await this._connexionService.signInWithEmailAndPassword(
      this.emailPasswordForm.value.email!, 
      this.emailPasswordForm.value.password!
    );
    this.handleSaveUserDate();
  }

  async handleCreateUserWithEmailAndPassword() {
    await this._connexionService.createUserWithEmailAndPassword(
      this.emailPasswordForm.value.email!,
      this.emailPasswordForm.value.password!
    );
    this.handleSaveUserDate();
  }

  async handleSaveUserDate() {
    //extract data from user$ Observable
    const user = await firstValueFrom(this.user$);
    //send to firebase
    if (user) {
      await this._connexionService.saveUserDate(user);
    }
  }

  async handleSignInAnonymously() {
    await this._connexionService.signInAnonymously();
  }

  async handleLogout() {
    await this._connexionService.logout();
  }
}
