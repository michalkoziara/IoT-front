import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceGroupComponent } from './add-device-group.component';

describe('AddDeviceGroupComponent', () => {
  let component: AddDeviceGroupComponent;
  let fixture: ComponentFixture<AddDeviceGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeviceGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
