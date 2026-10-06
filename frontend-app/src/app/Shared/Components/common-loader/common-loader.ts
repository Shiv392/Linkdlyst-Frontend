import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonLoaderService } from '../../Services/CommonLoaderService.service';

@Component({
  selector: 'app-common-loader',
  imports: [],
  templateUrl: './common-loader.html',
  styleUrl: './common-loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonLoader {

  private commonLoaderService = inject(CommonLoaderService);

  public showLoader = computed(()=> this.commonLoaderService.loading$());

}
