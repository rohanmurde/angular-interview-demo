import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;
  let component: UserFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UserFormComponent] }).compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
  });

  it('is invalid when required fields are empty', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('rejects emails on the forbidden domain via the custom validator', () => {
    component.form.get('email')?.setValue('someone@example.test');
    expect(component.form.get('email')?.errors?.['forbiddenDomain']).toBeTruthy();
  });

  it('adds and removes phone controls via FormArray', () => {
    component.addPhone();
    expect(component.phones.length).toBe(1);
    component.removePhone(0);
    expect(component.phones.length).toBe(0);
  });
});
