import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchterm: any): any {
    return value.filter(function(search){
       return search.name.indexOf(searchterm) > -1
    });
  }

}
