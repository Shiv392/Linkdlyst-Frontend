
import { Component, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { AuthService } from '../../../Shared/Services/Auth.service';
import { ConfigService } from '../../../Shared/Services/Config.service';
import {Router} from '@angular/router';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-side-bar',
  imports: [PanelMenu, Menu],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {

  private authService = inject(AuthService);
  private configService = inject(ConfigService);
  private router = inject(Router);

  public isLoggedIn = computed(()=> this.authService.isLoggedIn());
  public userName = computed(()=> this.configService.userName());
  public userEmail = computed(()=> this.configService.userEmail());

  protected readonly menuItems: MenuItem[] = [
    {
      label: 'Links',
      icon: 'pi pi-link',
      expanded: true,
      routerLink: ['/app/link'],
      items: [
        {
          label: 'All Links',
          icon: 'pi pi-list',
          routerLink: ['/app/link'],
        },
        {
          label: 'Analytics',
          icon: 'pi pi-chart-bar',
          routerLink: ['/app/analytics'],
        },
      ],
    },
    {
      label: 'Premium Features',
      icon: 'pi pi-star',
      expanded: true,
      routerLink: ['/app/custom-domains'],
      items: [
        {
          label: 'Custom Domains',
          icon: 'pi pi-globe',
          routerLink: ['/app/custom-domains'],
        },
        {
          label: 'Branded Links',
          icon: 'pi pi-palette',
          routerLink: ['/app/branded-links'],
        },
        {
          label: 'Team Access',
          icon: 'pi pi-users',
          routerLink: ['/app/team'],
        },
      ],
    },
    {
      label: 'Billing',
      icon: 'pi pi-wallet',
      expanded: true,
      routerLink: ['/app/payments'],
      items: [
        {
          label: 'Payments',
          icon: 'pi pi-credit-card',
          routerLink: ['/app/payments'],
        },
        {
          label: 'Subscriptions',
          icon: 'pi pi-sync',
          routerLink: ['/app/subscriptions'],
        },
      ],
    },
  ];

  public redirectLogin() : void{
    this.router.navigate(["/auth/login"])
  }
}
