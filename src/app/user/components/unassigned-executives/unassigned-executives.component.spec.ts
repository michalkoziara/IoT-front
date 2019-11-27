import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnassignedExecutivesComponent} from './unassigned-executives.component';

describe('UnassignedExecutivesComponent', () => {
  let component: UnassignedExecutivesComponent;
  let fixture: ComponentFixture<UnassignedExecutivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnassignedExecutivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedExecutivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
