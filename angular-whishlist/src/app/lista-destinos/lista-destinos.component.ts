import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction } from '../models/destinos-viajes-state.models';
@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinosApiClient ]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded:EventEmitter<DestinoViaje>;
  updates:string[];
all;
  //destinos: DestinoViaje[];
  constructor(public destinosApiClient:DestinosApiClient,     public store: Store<AppState>) { 
    this.onItemAdded = new EventEmitter();
    this.updates=[];
    this.store.select(state => state.destinos.favorito)
    .subscribe(data => {
      const f = data;
      if (f != null) {
        this.updates.push('Se eligió: ' + f.nombre);
      }
    });
  store.select(state=> state.destinos.items).subscribe(items=> this.all=items);
  }

  ngOnInit() {
   
  }
  /*
  guardar(nombre:string, url:string):boolean {
    this.destinos.push(new DestinoViaje(nombre, url));
    //console.log(new DestinoViaje(nombre,url));
    //console.log(this.destinos);
    return false;
  }*/
  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
   
  }

  elegido(e: DestinoViaje){
    //desmarcar todos los demas en en array de elegidos
    //this.destinos.forEach(function (x) {x.setSelected(false); });
    //se marca el elegido
    //d.setSelected(true);
    this.destinosApiClient.elegir(e);

  }
}
