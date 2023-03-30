import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './view/dashboard/dashboard.component';
import { YoutubeComponent } from './view/youtube/youtube.component';
import { TiktokComponent } from './view/tiktok/tiktok.component';


const routes: Routes = [
 { path:'', redirectTo:'dashboard', pathMatch:'full'},
 { path:'dashboard', component:DashboardComponent},
 { path:'youtube', component:YoutubeComponent},
 { path:'tiktok',component:TiktokComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [DashboardComponent, YoutubeComponent, TiktokComponent]
