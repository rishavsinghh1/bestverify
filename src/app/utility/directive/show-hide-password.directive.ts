import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appShowHidePassword]',
  standalone: true
})
export class ShowHidePasswordDirective {


  // constructor(
  //   private ele: ElementRef,
  //   private renderr2: Renderer2
  // ) { }

  // ngOnInit(): void {
  //   console.log(this.ele);

  // }
  private _shown = false;

  constructor(private el: ElementRef) {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.classList.add('pw-eye');
    span.innerHTML = '<i class="fas fa-eye-slash"></i>';
    span.addEventListener('click', () => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }

  toggle(span: HTMLElement) {
    this._shown = !this._shown;
    if (this._shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = `<i class="fas fa-eye" style="color: #337ab7; font-size: 18px;"></i>`;
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = `<i class="fas fa-eye-slash" style="color: #337ab7; font-size: 18px;"></i>`;
    }
  }

}
