import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfiguredDevicesComponent } from './unconfigured-devices.component';

describe('UnconfiguredDevicesComponent', () => {
  let component: UnconfiguredDevicesComponent;
  let fixture: ComponentFixture<UnconfiguredDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnconfiguredDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnconfiguredDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
