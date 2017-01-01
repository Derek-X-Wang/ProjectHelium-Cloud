import * as React from 'react';
import * as ReactDOM from 'react-dom';

export default class AddTodo extends React.Component<any,any> {
  static propTypes = {
    onAddClick: React.PropTypes.func.isRequired
  };
  render() {
    return (
      <div>
        <input type='text' ref="input" />
        <button onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    )
  };

  handleClick(e:any) {
    const node = ReactDOM.findDOMNode<HTMLInputElement>(this.refs['input']);
    const text = node.value.trim()
    this.props.onAddClick(text)
    node.value = ''
  }
}
