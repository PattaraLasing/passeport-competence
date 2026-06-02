import { Component, inject, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion/connexion-service';
import { firstValueFrom } from 'rxjs';
import { IonContent, IonButton, IonGrid, IonRow, IonCol, IonInput } from "@ionic/angular/standalone";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.html',
  styleUrls: ['./connexion-page.scss'],
  imports: [IonInput, IonCol, IonRow, IonGrid, IonButton, IonContent, ReactiveFormsModule, RouterLink],
})
export class ConnexionPage implements OnInit {

  private readonly _connexionService = inject(ConnexionService);

  public readonly user$ = this._connexionService.user$;
  public readonly userProfile$ = this._connexionService.getUserProfile();

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

  async handleLogout() {
    await this._connexionService.logout();
  }
}
