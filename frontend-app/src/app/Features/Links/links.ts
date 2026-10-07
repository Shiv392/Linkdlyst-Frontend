import { Component } from '@angular/core';
import { UrlShortnerInput } from '../../Shared/Components/url-shortner-input/url-shortner-input';
import { CommonModule } from '@angular/common';
import { CommonNavbar } from '../../Shared/Components/common-navbar/common-navbar';

type LinkStatus = 'Active' | 'Paused';

interface LinkItem {
  id: number;
  title: string;
  shortUrl: string;
  destination: string;
  clicks: number;
  created: string;
  status: LinkStatus;
}

@Component({
  selector: 'app-links',
  imports: [UrlShortnerInput, CommonModule, CommonNavbar],
  templateUrl: './links.html',
  styleUrl: './links.css',
})
export class Links {
  readonly navigationLinks = [
    { label: 'Home', route: '/home' },
    { label: 'My links', route: '/links' },
  ];

  searchTerm = '';
  statusFilter: 'All' | LinkStatus = 'All';
  copiedLinkId: number | null = null;

  readonly links: LinkItem[] = [
    {
      id: 1,
      title: 'Product launch',
      shortUrl: 'lnkd.ly/launch24',
      destination: 'https://acme.com/blog/product-launch-2024',
      clicks: 24892,
      created: 'Oct 24, 2024',
      status: 'Active',
    },
    {
      id: 2,
      title: 'LinkedIn campaign',
      shortUrl: 'lnkd.ly/linkedin-q4',
      destination: 'https://acme.com/campaigns/linkedin-autumn',
      clicks: 8416,
      created: 'Oct 18, 2024',
      status: 'Active',
    },
    {
      id: 3,
      title: 'Customer stories',
      shortUrl: 'lnkd.ly/customer-stories',
      destination: 'https://acme.com/customers/success-stories',
      clicks: 5102,
      created: 'Oct 12, 2024',
      status: 'Active',
    },
    {
      id: 4,
      title: 'Summer offer',
      shortUrl: 'lnkd.ly/summer24',
      destination: 'https://acme.com/offers/summer-sale',
      clicks: 3279,
      created: 'Sep 30, 2024',
      status: 'Paused',
    },
  ];

  get filteredLinks(): LinkItem[] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.links.filter((link) => {
      const matchesStatus = this.statusFilter === 'All' || link.status === this.statusFilter;
      const matchesSearch = !query || [link.title, link.shortUrl, link.destination]
        .some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }

  async copyLink(link: LinkItem): Promise<void> {
    if (!navigator.clipboard) return;

    await navigator.clipboard.writeText(`https://${link.shortUrl}`);
    this.copiedLinkId = link.id;
    setTimeout(() => {
      if (this.copiedLinkId === link.id) this.copiedLinkId = null;
    }, 1800);
  }
}
