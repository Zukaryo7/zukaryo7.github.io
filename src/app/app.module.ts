import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChronometerModule } from 'ngx-chronometer';
import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [	
    AppComponent, 
    LogsComponent,

   ],
  imports: [
    BrowserModule,
    NgxChronometerModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
