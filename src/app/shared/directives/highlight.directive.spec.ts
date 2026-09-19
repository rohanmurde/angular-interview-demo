import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: `<div appHighlight="#abc123">hover me</div>`,
})
class HostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('sets a background color on mouseenter', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('div');
    el.dispatchEvent(new Event('mouseenter'));
    expect(el.style.backgroundColor).toBeTruthy();
  });

  it('clears the background color on mouseleave', () => {
    const el: HTMLElement = fixture.nativeElement.querySelector('div');
    el.dispatchEvent(new Event('mouseenter'));
    el.dispatchEvent(new Event('mouseleave'));
    expect(el.style.backgroundColor).toBe('');
  });
});
