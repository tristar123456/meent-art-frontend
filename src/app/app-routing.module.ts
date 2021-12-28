import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PinboardComponent} from './pinboard/pinboard.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './providers/auth.guard';
import {CreateContentItemComponent} from './create-content-item/create-content-item.component';
import {EditItemComponent} from './edit-item/edit-item.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: PinboardComponent},
  {path: 'new', component: CreateContentItemComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', pathMatch: 'full', component: EditItemComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
