import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';

describe('Register', () => {

let component: Register;
let fixture: ComponentFixture<Register>;

beforeEach(async () => {

  await TestBed.configureTestingModule({
    imports: [Register],
  }).compileComponents();

  fixture = TestBed.createComponent(Register);
  component = fixture.componentInstance;
  await fixture.whenStable();

});

it('should create', () => {
  expect(component).toBeTruthy();
});

it('should set passwordMismatch when passwords differ', () => {

  const form = component.form;
  form.get('password')?.setValue('Password123');
  form.get('confirmPassword')?.setValue('Different123');
  form.updateValueAndValidity();

  expect(form.hasError('passwordMismatch')).toBe(true);
  expect(form.valid).toBe(false);

});

it('should be valid when passwords match', () => {

  const form = component.form;
  form.get('password')?.setValue('Password123');
  form.get('confirmPassword')?.setValue('Password123');
  form.updateValueAndValidity();

  expect(form.hasError('passwordMismatch')).toBe(false);
  expect(form.get('confirmPassword')?.hasError('required')).toBe(false);

});

});
