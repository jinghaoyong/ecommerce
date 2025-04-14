import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent implements OnInit {
  isShowSpinner = true;

  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private spinnerServ: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.spinnerServ.getSpinnerObserver().subscribe(status => {
      this.isShowSpinner = status === 'start';
      this.cdRef.detectChanges();
    });
  }
}