import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardComponent] }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
  });

  it('doubles the count via computed()', () => {
    fixture.componentInstance.increment();
    fixture.componentInstance.increment();
    expect(fixture.componentInstance.count()).toBe(2);
    expect(fixture.componentInstance.doubled()).toBe(4);
  });

  it('does not decrement below zero', () => {
    fixture.componentInstance.decrement();
    expect(fixture.componentInstance.count()).toBe(0);
  });
});
