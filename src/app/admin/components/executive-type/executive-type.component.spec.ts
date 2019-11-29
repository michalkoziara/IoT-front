import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExecutiveTypeComponent} from './executive-type.component';

describe('ExecutiveTypeComponent', () => {
  let component: ExecutiveTypeComponent;
  let fixture: ComponentFixture<ExecutiveTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExecutiveTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutiveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
