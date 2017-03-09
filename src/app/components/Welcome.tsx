import * as React from 'react';
import * as classNames from 'classnames';


class Welcome extends React.Component<void, void> {

  render() {
    return (
      <div className="page-welcome">
        <div className="page-welcome-text">
          <h1>Welcome</h1>
          <p>Please go to log for monitoring</p>
        </div>
      </div>
    );
  }
}

export default Welcome;
