import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // Para vincular un atributo existente del DOM es escuchado por el @HostListener
  @HostBinding('class.open') isOpen = false;
  // sirve para escuchar eventos en las directivas propias
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
