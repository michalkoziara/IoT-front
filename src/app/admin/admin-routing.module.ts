import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdministrationPanelComponent} from './components/administration-panel/administration-panel.component';
import {AuthGuard} from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'admin', component: AdministrationPanelComponent,
    children: [
      {path: 'dashboard', component: AdministrationPanelComponent},
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

export const routingComponents = [
  AdministrationPanelComponent
];
