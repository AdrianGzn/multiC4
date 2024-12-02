import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;
    const smallWords = ['de', 'la', 'el', 'y', 'en', 'a', 'un', 'una'];

    return value
      .split(' ') 
      .map((word, index, array) => {
        if (index === 0 || index === array.length - 1 || !smallWords.includes(word.toLowerCase())) {
          return this.capitalize(word);
        }
        return word.toLowerCase();
      })
      .join(' ');
  }
  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
