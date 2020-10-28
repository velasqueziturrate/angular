import { Component, OnInit } from '@angular/core';
//import { Component, Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';
//import { Store } from '@ngrx/store';
//import { AppState } from "src/app/app.module";

/*
export class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamando por la clase vieja!');
    return null;
  }
}

interface AppConfig {
  apiEndpoint: string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

@Injectable()
export class DestinosApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) private config: AppConfig, store: Store<AppState>) {
    super(store);
  }
  getById(id: String): DestinoViaje {
    console.log('llamando por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}
*/
@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ DestinosApiClient,
    /*
    [{ provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }],
    [{ provide: DestinosApiClient, useClass: DestinosApiClientDecorated }],
    [{ provide: DestinosApiClientViejo, useExisting: DestinosApiClient }],
    */
  ],
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout' {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  };
  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) {}
  //constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
