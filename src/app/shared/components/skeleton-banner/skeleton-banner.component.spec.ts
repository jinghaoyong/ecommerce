import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonBannerComponent } from './skeleton-banner.component';

describe('SkeletonBannerComponent', () => {
  let component: SkeletonBannerComponent;
  let fixture: ComponentFixture<SkeletonBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
