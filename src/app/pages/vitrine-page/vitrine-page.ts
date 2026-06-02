import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-vitrine-page',
  imports: [IonContent, IonButton, RouterLink],
  templateUrl: './vitrine-page.html',
  styleUrl: './vitrine-page.scss',
})
export class VitrinePage {}
