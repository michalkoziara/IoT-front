import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InnerToolbarComponent} from './inner-toolbar.component';

describe('InnerToolbarComponent', () => {
  let component: InnerToolbarComponent;
  let fixture: ComponentFixture<InnerToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
