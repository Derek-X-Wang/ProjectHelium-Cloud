import * as React from 'react';

import TodoTextInput from './TodoTextInput';

interface HeaderProps {
  addTodo: (text:string)=> any;
};

class Header extends React.Component<HeaderProps, void> {
  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="log-header">
          <h1>Log</h1>
          <TodoTextInput
            newTodo
            onSave={this.handleSave.bind(this)}
            placeholder="Waitting for actions" />
      </header>
    );
  }
}

export default Header;
