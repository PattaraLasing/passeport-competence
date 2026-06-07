import { Component, signal } from '@angular/core';
import { IonRouterOutlet, IonApp } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { addCircleOutline, closeCircleOutline, documentOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  imports: [IonRouterOutlet, IonApp],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CoffreXp');

  constructor() {
    addIcons({
      addCircleOutline,
      closeCircleOutline,
      documentOutline
    });
  }

}
