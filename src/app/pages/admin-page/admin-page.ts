import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.html',
  styleUrls: ['./admin-page.scss'],
  imports: [IonContent, IonButton, RouterLink],
})
export class AdminPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
