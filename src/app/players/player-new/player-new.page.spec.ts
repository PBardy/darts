import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerNewPage } from './player-new.page';

describe('PlayerNewPage', () => {
  let component: PlayerNewPage;
  let fixture: ComponentFixture<PlayerNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
