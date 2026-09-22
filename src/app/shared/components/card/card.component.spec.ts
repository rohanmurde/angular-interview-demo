import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CardComponent } from './card.component';

@Component({
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card>
      <div cardTitle>About this demo</div>
      <p>
        This is a simple Angular application that demonstrates some of the core concepts of Angular,
        including components, services, routing, and state management.
      </p>
    </app-card>
  `,
})
class CardHostComponent {}

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CardHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(CardHostComponent);
  });

  it('renders the card title and content', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h3').textContent).toContain('About this demo');
    expect(fixture.nativeElement.querySelector('p').textContent).toContain('This is a simple Angular application that demonstrates some of the core concepts of Angular, including components, services, routing, and state management.');
  });
});
