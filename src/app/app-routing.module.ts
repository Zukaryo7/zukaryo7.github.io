import { KanaGenComponent } from './kana-gen/kana-gen.component';
import { LogsComponent } from './logs/logs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/kana-gen', pathMatch: 'full' },

  { path: 'kana-gen', component: KanaGenComponent },
  { path: 'logs', component: LogsComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
