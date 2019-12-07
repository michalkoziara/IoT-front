import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSensorDialogComponent } from './delete-sensor-dialog.component';

describe('DeleteSensorDialogComponent', () => {
  let component: DeleteSensorDialogComponent;
  let fixture: ComponentFixture<DeleteSensorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSensorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSensorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
