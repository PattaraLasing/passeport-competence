import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonRouterOutlet, IonApp, IonHeader, IonContent, IonFooter, IonTitle, IonItem, IonList, IonGrid, IonRow, IonCol, IonText } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { addCircleOutline, closeCircleOutline, documentOutline, calendarOutline } from 'ionicons/icons';

const IonElements = [
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonText,
  IonFooter,
  IonHeader,
  IonTitle,
  IonRouterOutlet,
  IonApp
];

@Component({
  selector: 'app-root',
  imports: [RouterLink, ...IonElements],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('CoffreXp');

  constructor() {
    addIcons({
      addCircleOutline,
      closeCircleOutline,
      documentOutline,
      calendarOutline
    });
  }

}
