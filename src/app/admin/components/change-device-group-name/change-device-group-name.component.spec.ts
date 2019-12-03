import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDeviceGroupNameComponent } from './change-device-group-name.component';

describe('ChangeDeviceGroupNameComponent', () => {
  let component: ChangeDeviceGroupNameComponent;
  let fixture: ComponentFixture<ChangeDeviceGroupNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDeviceGroupNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDeviceGroupNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
