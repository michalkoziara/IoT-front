import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeviceGroupsCardComponent} from './device-groups-card.component';

describe('DeviceGroupsCardComponent', () => {
  let component: DeviceGroupsCardComponent;
  let fixture: ComponentFixture<DeviceGroupsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceGroupsCardComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceGroupsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
