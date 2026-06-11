import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonButton, IonRow, IonItem, IonInput, IonTextarea, IonIcon, IonGrid, IonTitle, IonCol, IonLabel, IonDatetime, IonModal, IonText, IonSegmentContent, IonSegmentView, IonSegmentButton, IonSegment, IonCard } from "@ionic/angular/standalone";
import { v4 as uuidv4 } from 'uuid';
import { Evidence, Experience, Header, Star } from '../../../interfaces/experience';
import { ExperienceService } from '../../../services/experience/experience-service';
import { format, toZonedTime } from 'date-fns-tz';
import { Router } from '@angular/router';

const IonElements = [
  IonContent,
  IonRow,
  IonIcon,
  IonTextarea,
  IonButton,
  IonItem,
  IonInput,
  IonGrid,
  IonTitle,
  IonCol,
  IonLabel,
  IonDatetime,
  IonModal,
  IonSegmentContent,
  IonSegmentView,
  IonSegment,
  IonSegmentButton,
  IonText, IonCard
];

@Component({
  selector: 'app-experience-new-page',
  templateUrl: './experience-new-page.html',
  styleUrls: ['./experience-new-page.scss'],
  imports: [ReactiveFormsModule, ...IonElements],
})
export class ExperienceNewPage {

  private readonly _experienceService = inject(ExperienceService);
  private readonly _router = inject(Router);

  private formBuilder = inject(FormBuilder);

  protected dateStartModal = signal(false);
  protected dateEndModal = signal(false);

  evidencesForm: FormGroup;

  experienceForm = this.formBuilder.group({
    header: this.formBuilder.group({
      title: ['', Validators.required],
      dateStart: [''],
      dateEnd: [''],
      location: [''],
      participants: ['']
    }),
    star: this.formBuilder.group({
      situation: [''],
      task: [''],
      action: [''],
      result: [''],
    }),
    note: [''],
  });

  constructor() {
    this.evidencesForm = this.formBuilder.group({
      evidences: this.formBuilder.array([])
    });
  }

  get evidences(): FormArray {
    return this.evidencesForm.get('evidences') as FormArray;
  }

  addEvidenceForm() {
    this.evidences.push(
      this.formBuilder.group({
        fileUUID: [''],
        name: [''],
        description: [''],
        fileStorage: [null]
      })
    )
  }

  removeEvidenceForm(index: number) {
    this.evidences.removeAt(index);
  }

  onEvidenceFileSelected($event: Event, index: number) {
    const uuid = uuidv4();
    const files = ($event?.target as HTMLInputElement).files;
    const selectedFile = files?.[0] ?? null;
    const fileName = selectedFile?.name;
    this.evidences.at(index).get('name')?.patchValue(fileName);
    this.evidences.at(index).get('fileUUID')?.patchValue(uuid);
    this.evidences.at(index).get('fileStorage')?.patchValue(selectedFile);
  }

  getDateStart(event: CustomEvent) {
    const dateFormat = this.formatDate(event);
    this.experienceForm.patchValue({ header: { dateStart: dateFormat } })
  }

  getDateEnd(event: CustomEvent) {
    const dateFormat = this.formatDate(event);
    this.experienceForm.patchValue({ header: { dateEnd: dateFormat } })
  }

  async handleAddExperience(): Promise<void> {
    const header: Header = {
      title: this.experienceForm.value.header?.title,
      dateStart: this.experienceForm.value.header?.dateStart,
      dateEnd: this.experienceForm.value.header?.dateEnd,
      location: this.experienceForm.value.header?.location,
      participants: this.experienceForm.value.header?.participants
    };

    const star: Star = {
      situation: this.experienceForm.value.star?.situation,
      task: this.experienceForm.value.star?.task,
      action: this.experienceForm.value.star?.action,
      result: this.experienceForm.value.star?.result
    };

    const experience: Experience = {
      uuid: uuidv4(),
      header: header,
      star: star,
      note: this.experienceForm.value.note,
      evidences: this.evidences.value as Evidence[]
    }

    try {
      await this._experienceService.addExperience(experience);
      await this._router.navigate(['/experiences']);
    } catch (error) {
      console.error('Erreur lors de la création Experience : ', error);
    }
  }

  private formatDate(event: CustomEvent): string {
    // Get the time zone set on the user's device
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Create a date object from a UTC date string
    const date = new Date(event.detail.value);
    // Use date-fns-tz to convert from UTC to a zoned time
    const zonedTime = toZonedTime(date, userTimeZone);
    // Create a formatted string from the zoned time
    const dateFormat = format(zonedTime, 'yyyy-MM-dd', { timeZone: userTimeZone });

    return dateFormat;
  }
}
