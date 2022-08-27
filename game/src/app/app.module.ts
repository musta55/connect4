import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UIComponent } from './ui/ui.component';
import { StartComponent } from './start/start.component';
import { PlayerSettingsComponent } from './player-settings/player-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    UIComponent,
    StartComponent,
    PlayerSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UIComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
