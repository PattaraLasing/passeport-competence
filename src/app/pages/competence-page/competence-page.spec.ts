import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencePage } from './competence-page';

describe('CompetencePage', () => {
  let component: CompetencePage;
  let fixture: ComponentFixture<CompetencePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetencePage],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetencePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
