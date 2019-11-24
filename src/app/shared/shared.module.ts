import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material.module';
import {AppFooterComponent} from './components/app-footer/app-footer.component';

@NgModule({
  imports: [CommonModule, FormsModule, AngularMaterialModule],
  providers: [],
  declarations: [AppFooterComponent],
  exports: [AppFooterComponent],
})
export class SharedModule {
}
