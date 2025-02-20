import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpecialContentService } from '../../../core/services/special-content/special-content.service';

@Component({
  selector: 'app-special-content',
  standalone: true,
  imports: [],
  templateUrl: './special-content.component.html',
  styleUrl: './special-content.component.scss'
})
export class SpecialContentComponent implements OnInit, OnDestroy {
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
      const allSpecialContents = await this.specialContentServ.getSpecialContent();
      this.specialContent1 = allSpecialContents.filter(content => content.tier === 1);
      this.specialContent2 = allSpecialContents.filter(content => content.tier === 2);
      this.specialContent3 = allSpecialContents.filter(content => content.tier === 3);
      console.log("special content 123",this.specialContent1,this.specialContent2,this.specialContent3)
    } catch (error) {
      console.error('Error loading special contents:', error);
    }
  }


  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
