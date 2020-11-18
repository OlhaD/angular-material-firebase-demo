import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionResultSnackbarComponent } from './action-result-snackbar.component';

describe('ActionResultSnackbarComponent', () => {
  let component: ActionResultSnackbarComponent;
  let fixture: ComponentFixture<ActionResultSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionResultSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionResultSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
