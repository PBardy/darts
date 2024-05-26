import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameStatsPage } from './game-stats.page';

describe('GameStatsPage', () => {
  let component: GameStatsPage;
  let fixture: ComponentFixture<GameStatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
