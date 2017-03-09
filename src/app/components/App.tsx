import * as React from 'react';
import * as classnames from 'classnames';
import Sidebar from './Sidebar'
import Content from './Content'

interface AppProps {
}

class App extends React.Component<AppProps, any> {

  constructor(props:any) {
    super(props);
    this.state = {showSidebar: false};
  }

  toggleSidebar() {
    this.setState({showSidebar: !this.state.showSidebar});
  }

  render() {
    let classes = classnames('page-wrapper', {open: this.state.showSidebar});
    return (
      <div id="page-wrapper" className={classes}>
        <Sidebar toggle={this.toggleSidebar.bind(this)}/>
        {this.props.children}
      </div>
    )
  }
}

export default App;
