import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipePipe } from './search-pipe.pipe';



@NgModule({
  declarations: [
    SearchPipePipe
  ],
  exports: [SearchPipePipe],
  imports: [
    CommonModule
  ]
})
export class SearchModule { }
