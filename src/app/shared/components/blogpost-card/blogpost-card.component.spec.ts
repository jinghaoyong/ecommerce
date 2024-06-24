import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostCardComponent } from './blogpost-card.component';

describe('BlogpostCardComponent', () => {
  let component: BlogpostCardComponent;
  let fixture: ComponentFixture<BlogpostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogpostCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogpostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
