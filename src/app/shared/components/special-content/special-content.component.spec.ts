import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialContentComponent } from './special-content.component';

describe('SpecialContentComponent', () => {
  let component: SpecialContentComponent;
  let fixture: ComponentFixture<SpecialContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
