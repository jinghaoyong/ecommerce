import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostsSectionComponent } from './blogposts-section.component';

describe('BlogpostsSectionComponent', () => {
  let component: BlogpostsSectionComponent;
  let fixture: ComponentFixture<BlogpostsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogpostsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogpostsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
