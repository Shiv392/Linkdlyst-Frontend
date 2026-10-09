import { afterNextRender, Component, inject, OnDestroy } from '@angular/core';
import { UrlShortnerInput } from '../../Shared/Components/url-shortner-input/url-shortner-input';
import { CommonModule } from '@angular/common';
import { CommonNavbar } from '../../Shared/Components/common-navbar/common-navbar';
import { LinkService } from './Services/links.service';
import { Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CommonLoaderService } from '../../Shared/Services/CommonLoaderService.service';
import { getLinksApiResponse, Link } from './Models/links.model';
import { CommonPaginator } from '../../Shared/Components/common-paginator/common-paginator';

type LinkStatus = 'Active' | 'Paused';

interface LinkItem {
  id: number;
  name: string;
  shortCode: string;
  url: string;
  clicks: number;
  created: string;
  status: LinkStatus;
}

@Component({
  selector: 'app-links',
  imports: [UrlShortnerInput, CommonModule, CommonNavbar, CommonPaginator],
  templateUrl: './links.html',
  styleUrl: './links.css',
})
export class Links implements OnDestroy {

  public linkService = inject(LinkService);
  private cookieService = inject(CookieService);
  private commonLoaderService = inject(CommonLoaderService);

  constructor(){
    afterNextRender(() => {
      const isLoggedIn = this.cookieService.get('isLoggedIn');
      if (isLoggedIn === 'true') this.getLinks();
    });
  }

  public searchTerm = '';
  public statusFilter: 'All' | LinkStatus = 'All';
  public copiedLinkId: number | null = null;

  public links: LinkItem[] = [];
  public totalCount:number = 0;

  private subject$ = new Subject<void>();  

  public getLinks() : void{
    this.commonLoaderService.showLoader();
    this.linkService.getLinks().pipe(takeUntil(this.subject$))
    .subscribe({
      next: (res : getLinksApiResponse)=>{
        this.commonLoaderService.hideLoader();
        if(res.success){
          this.totalCount = res.data.totalCount;

          res.data.data.forEach((data: Link)=>{
            this.links.push({
              name : data.name,
              id : data.id,
              shortCode : data.shortCode,
              status : 'Active',
              clicks : 0,
              created : data.createdAt,
              url : data.url
            })
          })
        }
      },
      error: ()=>{
        this.links = [];
        this.commonLoaderService.hideLoader();
      }
    })
  }

  async copyLink(link: LinkItem): Promise<void> {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(`https://${link.shortCode}`);
    this.copiedLinkId = link.id;
    setTimeout(() => {
      if (this.copiedLinkId === link.id) this.copiedLinkId = null;
    }, 1800);
  }

  public ngOnDestroy(): void {
      this.subject$.next();
      this.subject$.complete();
  }
}
