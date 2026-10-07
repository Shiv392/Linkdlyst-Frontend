import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonButton } from '../common-button/common-button';
import { AuthService } from '../../Services/Auth.service';
import { ConfigService } from '../../Services/Config.service';

export interface NavbarLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-common-navbar',
  imports: [CommonButton, RouterLink, RouterLinkActive],
  templateUrl: './common-navbar.html',
  styleUrl: './common-navbar.css'
})
export class CommonNavbar {

  @Input() links: NavbarLink[] = [];

  private readonly router = inject(Router);
  public authService = inject(AuthService);
  public configService = inject(ConfigService);

  public isLoggedIn = computed(()=> this.authService.isLoggedIn());
  public userEmail = computed(()=> this.configService.userEmail());
  public userName = computed(()=> this.configService.userName());

  redirectSignup(): void {
    void this.router.navigate(['/links']);
  }

  public redirectLogin() :void{
    this.router.navigate(['/auth/login'])
  }
}
