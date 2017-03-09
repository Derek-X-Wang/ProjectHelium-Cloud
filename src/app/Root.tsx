import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Routes from './routes'

class Root extends React.Component<any, any> {
  render() {
    return (
      Routes
    )
  }
}

const mapStateToProps = (state:any) => {
  return {
  }
};

export default connect(mapStateToProps)(Root)
