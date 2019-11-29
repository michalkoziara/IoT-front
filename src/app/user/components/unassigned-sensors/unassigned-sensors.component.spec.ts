import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnassignedSensorsComponent} from './unassigned-sensors.component';

describe('UnassignedSensorsComponent', () => {
  let component: UnassignedSensorsComponent;
  let fixture: ComponentFixture<UnassignedSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedSensorsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
