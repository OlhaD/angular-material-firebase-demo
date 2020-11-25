import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { SharedModule } from './shared/shared-module';
import { UsersModule } from './users/users.module';
import { FirestoreModule } from './shared/firestore/firestore.module';
import { RolesModule } from './roles/roles.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    UsersModule,  
    RolesModule,
    FirestoreModule
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
