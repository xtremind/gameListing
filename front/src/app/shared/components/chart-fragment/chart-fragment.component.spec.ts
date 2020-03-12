import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFragmentComponent } from './chart-fragment.component';

describe('ChartFragmentComponent', () => {
  let component: ChartFragmentComponent;
  let fixture: ComponentFixture<ChartFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
