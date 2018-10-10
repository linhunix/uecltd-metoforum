
import { Pipe, PipeTransform } from '@angular/core';
import { ln4Map } from './ln4.Map';
@Pipe({
  name: 'ln4Values'
})
export class ln4ValuesPipe implements PipeTransform {
  transform(value: object): any[] {
    let result = [];
    if (value!=null){
        let ln4cls:ln4Map=new ln4Map();
        ln4cls.fromAny(value);
        result = ln4cls.values();
    }
    return result;
  }
}