import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminStartCardComponent} from './admin-start-card.component';

describe('AdminStartCardComponent', () => {
  let component: AdminStartCardComponent;
  let fixture: ComponentFixture<AdminStartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStartCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
