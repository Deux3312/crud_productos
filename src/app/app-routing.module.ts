import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListproductsComponent } from './components/listproducts/listproducts.component';
import { AddEditProducComponent } from './components/add-edit-produc/add-edit-produc.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent},
  //{path: '', component:ListproductsComponent},
  {path: 'listproducts', component:ListproductsComponent},
  {path: 'add', component:AddEditProducComponent},
  {path: 'edit/:id', component:AddEditProducComponent},
  {path: 'edit', component:AddEditProducComponent},
  //{path: '**', redirectTo: 'component:NotFoundComponent', pathMatch: 'full'},
  {path: '**', redirectTo:'login' , pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
