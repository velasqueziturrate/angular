import {
    reducerDestinosViajes,
    DestinosViajesState,
    initializeDestinosViajesState,
    InitMyDataAction,
    NuevoDestinoAction
} from './destinos-viajes-state.model';
import { DestinoViaje } from './destino-viaje.model';

describe('reducerDestinosViajes', () => {
    it('should reduce init data', () => {
        // setup : es configurar la inicialización
        const prevState: DestinosViajesState = initializeDestinosViajesState();
        const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
        // action : es actuar sobre nuestro modelo productivo, sobre nuestro dominio productivo
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        // assertions o assert : es verificar que todo haya salido bien
        expect(newState.items.length).toEqual(2);
        expect(newState.items[0].nombre).toEqual('destino 1');
        // tear down ( solo cuando trabajamos con base de datos, pero este no es el caso ): y el tear down de ser neceario:
        // serian las acciones colaterales que haya generado nuestro codigo volverlas hacia atras para volver al estado de inicio.
    });

    it('should reduce new item added', () => {
        const prevState: DestinosViajesState = initializeDestinosViajesState();
        const action: NuevoDestinoAction = new NuevoDestinoAction(new DestinoViaje('barceola', 'url'));
        const newState: DestinosViajesState = reducerDestinosViajes(prevState, action);
        expect(newState.items.length).toEqual(1);
        expect(newState.items[0].nombre).toEqual('barcelona');
    });
});
