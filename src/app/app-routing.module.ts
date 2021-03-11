import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssociateMasterComponent } from './associate-master/associate-master.component';
import { CostSheetComponent } from './cost-sheet/cost-sheet.component';
import { JobAllocationComponent } from './job-allocation/job-allocation.component';
import { JobMasterComponent } from './job-master/job-master.component';
import { ManPowerComponent } from './man-power/man-power.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'manpowerMaster',   component: ManPowerComponent },
  { path: 'associateMaster',  component: AssociateMasterComponent },
  { path: 'jobMaster',        component: JobMasterComponent },
  { path: 'jobAllocation',    component: JobAllocationComponent },
  { path: 'costSheet',        component: CostSheetComponent },
  { path: '',                 redirectTo: '/jobMaster',       pathMatch: 'full' },
  { path: '**',               component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 
 } 