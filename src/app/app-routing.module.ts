import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DirtyCheckGuard } from './guards/dirty-check.guard';

export const routedComponents = [ ProfileComponent, DashboardComponent ];

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    pathMatch: "full",
    canDeactivate: [ DirtyCheckGuard ]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/profile"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
