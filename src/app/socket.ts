import * as actions from './actions';
import * as io from 'socket.io-client';

export default function (store:any) {
  const socket = io.connect('https://projecthelium-cloud.herokuapp.com');
  socket.on('action', (message:string) => {
    store.dispatch(actions.addTodo(message));
  });
}
