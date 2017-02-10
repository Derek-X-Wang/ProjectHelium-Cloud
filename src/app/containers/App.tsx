import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  addTodo,
  editTodo,
  clearCompleted,
  completeAll,
  completeTodo,
  deleteTodo
} from '../actions';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import { IState, Todo } from '../model';

interface AppProps {
  todos: IState;
  dispatch: Dispatch<any>;
}

class App extends React.Component<AppProps, any> {

  render() {
    // Injected by connect() call:
    const { todos, dispatch } = this.props;

    return (
      <div className="todoapp">
        <Header addTodo={(text: string) => dispatch(addTodo(text))} />
        <MainSection
            todos={todos}
            editTodo={(t,s) => dispatch(editTodo(t, s))}
            deleteTodo={(t: Todo) => dispatch(deleteTodo(t))}
            completeTodo={(t: Todo) => dispatch(completeTodo(t))}
            clearCompleted={() => dispatch(clearCompleted())}
            completeAll={() => dispatch(completeAll())}/>
      </div>
    )
  }
}

const mapStateToProps = (state:any) => {
  return {
    todos: state.todos
  }
};

export default connect(mapStateToProps)(App)
