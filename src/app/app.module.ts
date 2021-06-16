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

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

// AOT compilation support
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}