import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverallPage } from './overall.page';

describe('OverallPage', () => {
  let component: OverallPage;
  let fixture: ComponentFixture<OverallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
