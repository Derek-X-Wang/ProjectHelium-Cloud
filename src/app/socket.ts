import * as actions from './actions';
import * as io from 'socket.io-client';

export default function (store:any) {
  const socket = io.connect();
  socket.on('action', (message:string) => {
    store.dispatch(actions.addTodo(message));
  });
}
