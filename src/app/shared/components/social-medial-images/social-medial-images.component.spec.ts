import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMedialImagesComponent } from './social-medial-images.component';

describe('SocialMedialImagesComponent', () => {
  let component: SocialMedialImagesComponent;
  let fixture: ComponentFixture<SocialMedialImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMedialImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMedialImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
