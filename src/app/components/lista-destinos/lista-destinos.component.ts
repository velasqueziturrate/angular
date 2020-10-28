import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { Store, State } from '@ngrx/store';
import { AppState } from '../../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [ DestinosApiClient ]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  
  constructor(
    public destinosApiClient: DestinosApiClient,
    private store: Store<AppState>
    ) {
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    /*
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('se ha elegido a ' + d.nombre);
        }
      });
      store.select(state => state.destinos.items).subscribe(items => this.all = items);
      */
  }

  ngOnInit() {
    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        const f = data;
        if (f != null) {
          this.updates.push('se eligio: ' + f.nombre);
        }
      });
  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d: DestinoViaje) {
    this.destinosApiClient.elegir(d);
  }

  getAll() {

  }

}
