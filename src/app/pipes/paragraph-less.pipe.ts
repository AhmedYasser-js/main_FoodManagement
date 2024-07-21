import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraphLess'
})
export class ParagraphLessPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const words = value.split(' ');
    if (words.length <= 4) {
      return value;
    }

    return words.slice(0, 4).join(' ') + ' ....';
  }


}
