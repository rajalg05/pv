import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociateMasterComponent } from './associate-master/associate-master.component';
import { CostSheetComponent } from './cost-sheet/cost-sheet.component';
import { JobAllocationComponent } from './job-allocation/job-allocation.component';
import { JobMasterComponent } from './job-master/job-master.component';
import { ManPowerComponent } from './man-power/man-power.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'manpowerMaster',   component: ManPowerComponent },
  { path: 'associateMaster',  component: AssociateMasterComponent },
  { path: 'jobMaster',        component: JobMasterComponent },
  { path: 'jobAllocation',    
    component: JobAllocationComponent,
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'subAssociate'
    }  },
  { path: 'costSheet',        component: CostSheetComponent },
 // { path: '',                 redirectTo: '/jobMaster',       pathMatch: 'full' },
 // { path: '**',               component: PageNotFoundComponent },
 // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 } 