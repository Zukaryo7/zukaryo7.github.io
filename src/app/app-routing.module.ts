import { HomeComponent } from './home/home.component';
import { KanaGenComponent } from './kana-gen/kana-gen.component';
import { LogsComponent } from './logs/logs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent},
  { path: 'kana-gen', component: KanaGenComponent },
  { path: 'logs', component: LogsComponent },

  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
