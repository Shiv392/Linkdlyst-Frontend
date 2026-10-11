import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';

@Component({
  selector: 'app-side-bar',
  imports: [PanelMenu],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  protected readonly menuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      items: [
        { label: 'Account overview', icon: 'pi pi-id-card' },
        { label: 'Preferences', icon: 'pi pi-cog' },
      ],
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      items: [
        { label: 'Performance', icon: 'pi pi-chart-line' },
        { label: 'Audience', icon: 'pi pi-users' },
      ],
    },
    {
      label: 'Links',
      icon: 'pi pi-link',
      items: [
        { label: 'All links', icon: 'pi pi-list', routerLink: ['/app'] },
        { label: 'Create a link', icon: 'pi pi-plus', routerLink: ['/app'] },
      ],
    },
    {
      label: 'Premium Features',
      icon: 'pi pi-star',
      items: [
        { label: 'Custom domains', icon: 'pi pi-globe' },
        { label: 'Branded links', icon: 'pi pi-palette' },
        { label: 'Team access', icon: 'pi pi-users' },
      ],
    },
  ];
}
