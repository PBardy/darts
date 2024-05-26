import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameEditPage } from './game-edit.page';

describe('GameEditPage', () => {
  let component: GameEditPage;
  let fixture: ComponentFixture<GameEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
