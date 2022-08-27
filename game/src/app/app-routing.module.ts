import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerSettingsComponent } from './player-settings/player-settings.component';
import { StartComponent } from './start/start.component';
import { UIComponent } from './ui/ui.component';

const routes: Routes = [
  { path: 'game', component: UIComponent },
  { path: 'player', component: PlayerSettingsComponent},
  { path: '', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
