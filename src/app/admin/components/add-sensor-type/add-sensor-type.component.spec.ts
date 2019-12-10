import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSensorTypeComponent } from './add-sensor-type.component';

describe('AddSensorTypeComponent', () => {
  let component: AddSensorTypeComponent;
  let fixture: ComponentFixture<AddSensorTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSensorTypeComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSensorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
