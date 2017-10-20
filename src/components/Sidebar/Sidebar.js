import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  //activeRoute(routeName) {
    //return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  //}

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></NavLink>
            </li>
            <li className="nav-title">
              Front Elements
            </li>
            <li className="nav-item">
              <NavLink to={'/slider/all'} className="nav-link" activeClassName="active"><i className="fa fa-image"></i> Banner / Slider </NavLink>
            </li>
              <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-puzzle"></i> Static Pages</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/page/all'} className="nav-link" activeClassName="active"><i className="fa fa-files-o"></i> All Pages</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/page/new'} className="nav-link" activeClassName="active"><i className="fa fa-plus"></i> Add Pages</NavLink>
                </li>

              </ul>
            </li>
            
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-newspaper-o"></i> Blog</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/blog/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Blog</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/blog/new'} className="nav-link" activeClassName="active"><i className="fa fa-plus"></i> Add Blog</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/blog/category/all'} className="nav-link" activeClassName="active"><i className="fa fa-tag"></i>Blog Category</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-user"></i> Customer</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/customer/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Customer</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/customer/block'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Block Customer</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/customer/suspend'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Suspend Customer</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/customer/new'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Add New</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-university"></i> Investor</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/investor/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Investor</NavLink>
                </li>
              
                 <li className="nav-item">
                  <NavLink to={'/investor/new'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Add New</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-clipboard"></i> Invoice</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/invoice/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Invoice</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/invoice/accept'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Accept Invoice</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/invoice/cancel'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Cancel Invoice</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/invoice/new'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Add New</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-money"></i> Donation</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/donation/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Donation</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/donation/new'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Add New</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-money"></i>Withdraw</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/wthdraw/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Withdraw</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/wthdraw/unpaid'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Unpaid Withdraw</NavLink>
                </li>
               <li className="nav-item">
                  <NavLink to={'/wthdraw/paid'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Paid Withdraw</NavLink>
                </li>
              </ul>
            </li>
            
            
            <li className="divider"></li>
            <li className="nav-title">
              SETTINGS
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-game-controller"></i> Invoice Settings</a>
              <ul className="nav-dropdown-items">
               
                <li className="nav-item">
                  <NavLink to={'/setting/tempo/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Tempo</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/setting/sector/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Sector Industri</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/setting/Amount/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Invoice Amount</NavLink>
                </li>

              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-screen-desktop"></i> Web Settings</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/setting/meta'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Meta Information</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/setting/payment'} className="nav-link" activeClassName="active"><i className="fa fa-money"></i> Payment</NavLink>
                </li>
               
              </ul>
            </li>

              <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-cogs"></i> 3rd Party Plugin</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/plugin/google'} className="nav-link" activeClassName="active"><i className="fa fa-google"></i> Google</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/mailchimp'} className="nav-link" activeClassName="active"><i className="fa fa-envelope-o"></i>Mailchimp</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/cloudinary'} className="nav-link" activeClassName="active"><i className="fa fa-cloud-upload"></i>Cloudinary</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/plugin/mailgun'} className="nav-link" activeClassName="active"><i className="fa fa-envelope-o"></i>Mailgun</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/sendgrid'} className="nav-link" activeClassName="active"><i className="fa fa-envelope-o"></i>Sendgrid</NavLink>
                </li>
               
              </ul>
            </li>
           
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
