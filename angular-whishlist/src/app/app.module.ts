import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './components/form-destino-viaje/form-destino-viaje.component';
//import { DestinosApiClient } from './models/destinos-api-client.model';
import { CommonModule } from '@angular/common';  
import { DestinosViajesEffects, DestinosViajesState, intializeDestinosViajesState, reducerDestinosViajes } from './models/destinos-viajes-state.models';
import { StoreModule as NgRxStoreModule,ActionReducerMap } from '@ngrx/store';
import { EffectsModule} from '@ngrx/effects';
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetalleComponentComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';

// init routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponentComponent },
];


const routes:Routes=[
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'home',component:ListaDestinosComponent},
{path:'destino',component:DestinoDetalleComponent},
{ path: 'login', component: LoginComponent },
{
  path: 'protected',
  component: ProtectedComponent,
  canActivate: [ UsuarioLogueadoGuard ]
},  {
  path: 'vuelos',
  component: VuelosComponentComponent,
  canActivate: [ UsuarioLogueadoGuard ],
  children: childrenRoutesVuelos
}
];

//redux init
export interface AppState{
  destinos:DestinosViajesState;
}
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

const reducersInitialState = {
    destinos: intializeDestinosViajesState()
};
//redux fin init

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
    VuelosMasInfoComponentComponent,
    VuelosDetalleComponentComponent,
    
  ],
  imports: [CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers,{initialState: reducersInitialState,
    runtimeChecks:{
      strictActionImmutability:false,
      strictStateImmutability:false
    }}),
    EffectsModule.forRoot([DestinosViajesEffects])
  ],
  providers: [AuthService,UsuarioLogueadoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
