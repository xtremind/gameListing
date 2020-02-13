import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFragmentComponent } from './game-fragment.component';

describe('GameFragmentComponent', () => {
  let component: GameFragmentComponent;
  let fixture: ComponentFixture<GameFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
