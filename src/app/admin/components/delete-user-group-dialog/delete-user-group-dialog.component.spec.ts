import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserGroupDialogComponent } from './delete-user-group-dialog.component';

describe('DeleteUserGroupDialogComponent', () => {
  let component: DeleteUserGroupDialogComponent;
  let fixture: ComponentFixture<DeleteUserGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUserGroupDialogComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
