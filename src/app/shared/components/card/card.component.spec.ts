import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardComponent);
  });

  it('projects content inside the card body', () => {
    fixture.componentInstance.title = 'Hello';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.card-title').textContent).toContain('Hello');
  });
});
