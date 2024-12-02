import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLowercase'
})
export class ToLowercasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; 
    return value.toLowerCase(); 
  }
}
