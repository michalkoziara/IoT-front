import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExecutiveTypeComponent } from './add-executive-type.component';

describe('AddExecutiveTypeComponent', () => {
  let component: AddExecutiveTypeComponent;
  let fixture: ComponentFixture<AddExecutiveTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExecutiveTypeComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExecutiveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
