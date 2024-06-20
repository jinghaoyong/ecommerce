import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCategoriesComponent } from './sales-categories.component';

describe('SalesCategoriesComponent', () => {
  let component: SalesCategoriesComponent;
  let fixture: ComponentFixture<SalesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
