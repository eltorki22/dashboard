import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// المحقق المخصص للتحقق من 3 حروف متشابهة متتالية
export function noTripleLettersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // لا نطبق أي تحقق إذا كانت القيمة فارغة
    }

    // التعبير العادي للتحقق من 3 حروف متشابهة
    const forbiddenPattern = /(.)\1\1/; // هذا يتحقق من أي حرف يتكرر 3 مرات متتالية

    // إذا كانت القيمة تحتوي على الحروف المتشابهة، نرجع رسالة الخطأ
    return forbiddenPattern.test(value) ? { 'tripleLetters': true } : null;
  };
}