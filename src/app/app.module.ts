import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChronometerModule } from 'ngx-chronometer';
import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { KanaGenComponent } from './kana-gen/kana-gen.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [	
    AppComponent, 
    LogsComponent, 
    KanaGenComponent, 
    HomeComponent, 
    NotFoundComponent, 
    AboutComponent,

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
