import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserGroupsInDeviceComponent} from './user-groups-in-device.component';

describe('UserGroupsInDeviceComponent', () => {
  let component: UserGroupsInDeviceComponent;
  let fixture: ComponentFixture<UserGroupsInDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsInDeviceComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsInDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
