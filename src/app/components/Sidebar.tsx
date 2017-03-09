import * as React from 'react';
import { Link } from 'react-router';

interface SidebarProps {
  toggle:any;
}

class Sidebar extends React.Component<SidebarProps, any> {

  render() {
    return (
      <div id="sidebar-wrapper">
        <ul className="sidebar">
          <li className="sidebar-main">
            <a onClick={() => this.props.toggle()}>
              Dashboard
              <span className="menu-icon glyphicon glyphicon-transfer"></span>
            </a>
          </li>
          <li className="sidebar-title"><span>TOOL</span></li>
            <li className="sidebar-list">
              <Link to="/log">Log <span className="menu-icon fa fa-list-alt"></span></Link>
            </li>
          <li className="sidebar-title"><span>NAVIGATION</span></li>
            <li className="sidebar-list">
              <Link to="/">Welcome <span className="menu-icon fa fa-home"></span></Link>
            </li>
        </ul>
        <div className="sidebar-footer">
          <div className="col-xs-4">
            <a href="https://github.com/Derek-X-Wang/ProjectHelium-Cloud" target="_blank">
              Github
            </a>
          </div>
          <div className="col-xs-4">
            <a href="https://github.com/Derek-X-Wang/ProjectHelium-Cloud" target="_blank">
              About
            </a>
          </div>
          <div className="col-xs-4">
            <a href="#">
              Support
            </a>
          </div>
        </div>
      </div>
    )
  };
}

export default Sidebar;
