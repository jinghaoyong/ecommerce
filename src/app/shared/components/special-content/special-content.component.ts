import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpecialContentService } from '../../../core/services/special-content/special-content.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-special-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './special-content.component.html',
  styleUrl: './special-content.component.scss'
})
export class SpecialContentComponent implements OnInit, OnDestroy {
  allSpecialContents?: any[];

  specialContent1?: any;
  specialContent2?: any;
  specialContent3?: any;

  constructor(
    private specialContentServ: SpecialContentService
  ) {
    this.loadSpecialContents();
  }

  async loadSpecialContents() {
    try {
      this.allSpecialContents = await this.specialContentServ.getSpecialContent();
      this.specialContent1 = this.allSpecialContents.filter(content => content.tier === 1);
      this.specialContent2 = this.allSpecialContents.filter(content => content.tier === 2);
      this.specialContent3 = this.allSpecialContents.filter(content => content.tier === 3);
      console.log("special content 123", this.specialContent1, this.specialContent2, this.specialContent3)
    } catch (error) {
      console.error('Error loading special contents:', error);
    }
  }


  ngOnDestroy(): void {
  }
  
  ngOnInit(): void {
  }
}
