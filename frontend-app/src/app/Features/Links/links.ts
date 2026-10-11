import { afterNextRender, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UrlShortnerInput } from '../../Shared/Components/url-shortner-input/url-shortner-input';
import { CommonModule } from '@angular/common';
import { CommonNavbar } from '../../Shared/Components/common-navbar/common-navbar';
import { LinkService } from './Services/links.service';
import { Subject, takeUntil } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { CommonLoaderService } from '../../Shared/Services/CommonLoaderService.service';
import { getLinksApiResponse, Link } from './Models/links.model';
import { CommonPaginator } from '../../Shared/Components/common-paginator/common-paginator';
import { PageChangeEvent } from '../../Shared/Types/Shared.type';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { SideBar } from './side-bar/side-bar';

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
  imports: [UrlShortnerInput, CommonModule, CommonNavbar, CommonPaginator, TableModule, SkeletonModule, SideBar],
  templateUrl: './links.html',
  styleUrl: './links.css',
})
export class Links implements OnDestroy, OnInit {

  public linkService = inject(LinkService);
  private cookieService = inject(CookieService);
  private commonLoaderService = inject(CommonLoaderService);

  ngOnInit(): void {
    const isLoggedIn = this.cookieService.get('isLoggedIn');
    console.log("is logged in ..........", isLoggedIn);

    if (isLoggedIn == 'true') {
      this.getLinks();
    }

    this.reloadLinkApi();
  }

  public searchTerm = '';
  public statusFilter: 'All' | LinkStatus = 'All';
  public copiedLinkId: number | null = null;

  public links: LinkItem[] = [];
  public totalCount: number = 0;

  public get visibleLinks(): LinkItem[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.links.filter(link => {
      const matchesStatus = this.statusFilter === 'All' || link.status === this.statusFilter;
      const matchesSearch = !query || [link.name, link.shortCode, link.url]
        .some(value => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }

  private subject$ = new Subject<void>();

  private page: number = 1;
  private limit: number = 10;

  public isLoading: boolean = false;
  public skeletonRows = Array.from({ length: 5 });


  public getLinks(): void {
    const apibody = {
      "offset": this.page - 1,
      "limit": this.limit
    }
    this.linkService.getLinks(apibody).pipe(takeUntil(this.subject$))
      .subscribe({
        next: (res: getLinksApiResponse) => {
          this.commonLoaderService.hideLoader();
          this.isLoading = false;
          if (res.success) {
            this.totalCount = res.data?.totalCount;

            console.log("Total count: " + this.totalCount);

            res?.data?.data?.forEach((data: Link) => {
              this.links.push({
                name: data.name,
                id: data.id,
                shortCode: data.shortCode,
                status: 'Active',
                clicks: 0,
                created: data.createdAt,
                url: data.url
              })
            })
          }
        },
        error: () => {
          this.links = [];
          this.commonLoaderService.hideLoader();
          this.isLoading = false;
        }
      })
  }

  public reloadLinkApi(): void {
    this.linkService.reloadApiSubject.pipe(takeUntil(this.subject$))
      .subscribe(event => {
        if (event) {
          this.page = 1;
          this.limit = 10;

          this.isLoading = true;
          this.getLinks();
        }
      })
  }

  async copyLink(link: LinkItem): Promise<void> {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(`https://${link.shortCode}`);
    this.copiedLinkId = link.id;
  }

  public paginatorEvent(event: PageChangeEvent): void {
    console.log("Shiv Soni.....................", event)
  }

  public ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }
}
