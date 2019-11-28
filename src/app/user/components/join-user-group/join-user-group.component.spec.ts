import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinUserGroupComponent } from './join-user-group.component';

describe('JoinUserGroupComponent', () => {
  let component: JoinUserGroupComponent;
  let fixture: ComponentFixture<JoinUserGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinUserGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinUserGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
