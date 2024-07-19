import { Component } from '@angular/core';
import { TopHeaderComponent } from '../layout/top-header/top-header.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [TopHeaderComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

}
