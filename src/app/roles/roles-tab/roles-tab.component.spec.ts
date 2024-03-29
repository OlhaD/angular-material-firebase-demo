import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesTabComponent } from './roles-tab.component';

describe('RolesTabComponent', () => {
  let component: RolesTabComponent;
  let fixture: ComponentFixture<RolesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
