import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManPowerComponent } from './man-power/man-power.component';
import { AssociateMasterComponent } from './associate-master/associate-master.component';
import { JobMasterComponent } from './job-master/job-master.component';
import { JobAllocationComponent } from './job-allocation/job-allocation.component';
import { CostSheetComponent } from './cost-sheet/cost-sheet.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreComponent } from './core/core.component';
import { MatTabsModule } from '@angular/material/tabs';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    ManPowerComponent,
    AssociateMasterComponent,
    JobMasterComponent,
    JobAllocationComponent,
    CostSheetComponent,
    PageNotFoundComponent,
    CoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
