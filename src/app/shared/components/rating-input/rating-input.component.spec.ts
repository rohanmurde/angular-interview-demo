import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingInputComponent } from './rating-input.component';

describe('RatingInputComponent (ControlValueAccessor)', () => {
  let fixture: ComponentFixture<RatingInputComponent>;
  let component: RatingInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingInputComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(RatingInputComponent);
    component = fixture.componentInstance;
  });

  it('writes an external value via writeValue()', () => {
    component.writeValue(3);
    expect(component.value).toBe(3);
  });

  it('calls the registered onChange callback when a star is selected', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    component.select(4);
    expect(onChange).toHaveBeenCalledWith(4);
    expect(component.value).toBe(4);
  });

  it('ignores selection while disabled', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    component.setDisabledState(true);
    component.select(5);
    expect(onChange).not.toHaveBeenCalled();
  });
});
