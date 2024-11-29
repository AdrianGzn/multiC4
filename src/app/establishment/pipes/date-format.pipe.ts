import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: any, format: string = 'shortDate'): any {
    if (!value) return value;

    if (value instanceof Date || typeof value === 'string') {
      return this.datePipe.transform(value, format);
    }

    return value;
  }
}
