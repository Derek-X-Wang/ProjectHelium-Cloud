import * as React from 'react';

interface ContentProps {
  children:any
}

class Content extends React.Component<ContentProps, any> {

  render() {
    return (
      <div id="content-wrapper">
        <div className="page-content">
          {this.props.children}
        </div>
      </div>
    )
  };
}

export default Content;
