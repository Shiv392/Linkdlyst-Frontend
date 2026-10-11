import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PageChangeEvent } from '../../Types/Shared.type';

@Component({
  selector: 'app-common-paginator',
  imports: [CommonModule, PaginatorModule],
  templateUrl: './common-paginator.html',
  styleUrl: './common-paginator.css',
})

export class CommonPaginator implements OnChanges {

    @Input() totalCount? : number;

    public first: number = 0;
    public rows: number = 10;

    @Output() pageChangeEmitter  = new EventEmitter<PageChangeEvent>();

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['totalCount']){
        console.log("Total count in paginator component............", this.totalCount)
      }
    }

  public onPageChange(event: PaginatorState){
    console.log("event: ", event);
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;

        this.pageChangeEmitter.emit({
          page : event.page || 1,
          rows : event.rows || 10
        });
  }
}
