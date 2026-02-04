import { ElementRef } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  let directive: UppercaseDirective;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    // Create a fake input element
    inputElement = document.createElement('input');

    // Wrap it with ElementRef
    const elementRef = new ElementRef(inputElement);

    // Pass ElementRef to directive
    directive = new UppercaseDirective(elementRef);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should convert input value to uppercase', () => {
    // Set lowercase value
    inputElement.value = 'angular';

    // Trigger input event
    inputElement.dispatchEvent(new Event('input'));

    // Expect uppercase output
    expect(inputElement.value).toBe('ANGULAR');
  });
});
import { ElementRef } from '@angular/core';
import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  let directive: UppercaseDirective;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    // Create a fake input element
    inputElement = document.createElement('input');

    // Wrap it with ElementRef
    const elementRef = new ElementRef(inputElement);

    // Pass ElementRef to directive
    directive = new UppercaseDirective(elementRef);
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should convert input value to uppercase', () => {
    // Set lowercase value
    inputElement.value = 'angular';

    // Trigger input event
    inputElement.dispatchEvent(new Event('input'));

    // Expect uppercase output
    expect(inputElement.value).toBe('ANGULAR');
  });
});
