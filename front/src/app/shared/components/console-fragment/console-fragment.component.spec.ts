import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleFragmentComponent } from './console-fragment.component';

describe('ConsoleFragmentComponent', () => {
  let component: ConsoleFragmentComponent;
  let fixture: ComponentFixture<ConsoleFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
