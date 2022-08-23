import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UIComponent } from './ui/ui.component';

const routes: Routes = [
  { path: 'game', component: UIComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
