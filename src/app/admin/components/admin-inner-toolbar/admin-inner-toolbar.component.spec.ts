import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminInnerToolbarComponent} from './admin-inner-toolbar.component';

describe('AdminInnerToolbarComponent', () => {
  let component: AdminInnerToolbarComponent;
  let fixture: ComponentFixture<AdminInnerToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInnerToolbarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInnerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
