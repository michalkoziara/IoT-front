import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeviceGroupComponent } from './delete-device-group.component';

describe('DeleteDeviceGroupComponent', () => {
  let component: DeleteDeviceGroupComponent;
  let fixture: ComponentFixture<DeleteDeviceGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDeviceGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeviceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
