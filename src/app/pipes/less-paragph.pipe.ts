import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lessParagph'
})
export class LessParagphPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const words = value.split(' ');
    if (words.length <= 3) {
      return value;
    }

    return words.slice(0, 3).join(' ') + ' ....';
  }

}
