import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './modules/material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LogoutComponent,
    DeleteModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
