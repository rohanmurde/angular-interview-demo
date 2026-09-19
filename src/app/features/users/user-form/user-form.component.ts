import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingInputComponent } from '../../../shared/components/rating-input/rating-input.component';
import { AppStoreService } from '../../../core/services/app-store.service';

// Custom validator: rejects emails on a blocked domain.
function forbiddenDomainValidator(domain: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '') as string;
    return value.toLowerCase().endsWith(`@${domain}`)
      ? { forbiddenDomain: { domain } }
      : null;
  };
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, RatingInputComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(AppStoreService);

  readonly form = this.fb.group({
    name: this.fb.control('', { validators: [Validators.required] }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email, forbiddenDomainValidator('example.test')],
    }),
    rating: this.fb.control(0),
    phones: this.fb.array<string>([]),
  });

  get phones(): FormArray {
    return this.form.get('phones') as FormArray;
  }

  addPhone(): void {
    this.phones.push(this.fb.control('', { validators: [Validators.required] }));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const newUser = this.form.getRawValue();
    // Demo only: log the payload instead of calling an API.
    console.log('User form submitted', newUser);

    const user = {
      id: Math.max(0, ...this.store.users().map((existingUser) => existingUser.id)) + 1,
      name: newUser.name ?? '',
      email: newUser.email ?? '',
      rating: newUser.rating ?? 0,
    };

    this.store.setUsers([
      ...this.store.users(),
      user,
    ]);
  }
}
