import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BannerService } from '../../../core/services/banner/banner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  banners: any[] = [];

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.loadBanners();
  }

  async loadBanners() {
    this.banners = await this.bannerService.getBanner();
  }

}
