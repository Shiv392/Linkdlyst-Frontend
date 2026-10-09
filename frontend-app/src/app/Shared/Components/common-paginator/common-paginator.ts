import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-common-paginator',
  imports: [CommonModule, PaginatorModule],
  templateUrl: './common-paginator.html',
  styleUrl: './common-paginator.css',
})
export class CommonPaginator {

    public first: number = 0;
    public rows: number = 10;

  public onPageChange(event: any){
    console.log("event: ", event);
            this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
  }
}
