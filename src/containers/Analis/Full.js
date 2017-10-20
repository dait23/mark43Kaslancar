import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'
import 'tachyons'
import {MainApi} from '../../views/Api/';
//import App from './App'

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import Charts from '../../views/Charts/'
import Widgets from '../../views/Widgets/'
import Buttons from '../../views/Components/Buttons/'
import Cards from '../../views/Components/Cards/'
import Forms from '../../views/Components/Forms/'
import Modals from '../../views/Components/Modals/'
import SocialButtons from '../../views/Components/SocialButtons/'
import Switches from '../../views/Components/Switches/'
import Tables from '../../views/Components/Tables/'
import Tabs from '../../views/Components/Tabs/'
import FontAwesome from '../../views/Icons/FontAwesome/'
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/'


import Slider from '../../views/Slider/All/'
import NewSlider from '../../views/Slider/New/'
import EditSlider from '../../views/Slider/Edit/'

import Page from '../../views/Pages/All/'
import NewPage from '../../views/Pages/New/'
import EditPage from '../../views/Pages/Edit/'

import Login from '../../views/Pages/Login/'

import Blog from '../../views/Blog/All/'
import NewBlog from '../../views/Blog/New/'
import EditBlog from '../../views/Blog/Edit/'


import CategoryBlog from '../../views/Blog/Category/All'
import CategoryNew from '../../views/Blog/Category/New'
import CategoryEdit from '../../views/Blog/Category/Edit'



import Google from '../../views/Plugin/Maps/'
import Foursquare from '../../views/Plugin/Foursquare/'
import Mailchimp from '../../views/Plugin/Mailchimp/'
import Cloudinary from '../../views/Plugin/Cloudinary/'
import Mailgun from '../../views/Plugin/Mailgun/'
import Sendgrid from '../../views/Plugin/Sendgrid/'
import Flickr from '../../views/Plugin/Flickr/'


import Meta from '../../views/Setting/Meta/'
import Payment from '../../views/Setting/Payment/'
import Country from '../../views/Setting/Country/All'
import NewCountry from '../../views/Setting/Country/New'
import EditCountry from '../../views/Setting/Country/Edit'


import Promo from '../../views/Setting/Promo/All'
import NewPromo from '../../views/Setting/Promo/New'
import EditPromo from '../../views/Setting/Promo/Edit'



import Member from '../../views/Member/All'
import EditMember from '../../views/Member/Edit'
import BlockMember from '../../views/Member/Block'
import SuspendMember from '../../views/Member/Suspend'

/////////////////////////////////////INVOICE SECTION


import Tempo from '../../views/Setting/Tempo/All'
import NewTempo from '../../views/Setting/Tempo/New'
import EditTempo from '../../views/Setting/Tempo/Edit'


import Sector from '../../views/Setting/Sector/All'
import NewSector from '../../views/Setting/Sector/New'
import EditSector from '../../views/Setting/Sector/Edit'

import Amount from '../../views/Setting/Amount/'

//import Withdraw from '../../views/Withdraw/All'
//import UnpaidWithdraw from '../../views/Withdraw/Unpaid'
//import PaidWithdraw from '../../views/Withdraw/Paid'
//import PayWithdraw from '../../views/Withdraw/Pay'


import Invoice from '../../views/Invoice/All'
import NewInvoice from '../../views/Invoice/New'
import EditInvoice from '../../views/Invoice/Edit'
//import CancelInvoice from '../../views/Invoice/Cancel'
//import AcceptInvoice from '../../views/Invoice/Accept'


import Customer from '../../views/Customer/All'
import EditCustomer from '../../views/Customer/Edit'
import NewCustomer from '../../views/Customer/New'
import BlockCustomer from '../../views/Customer/Block'
import SuspendCustomer from '../../views/Customer/Suspend'

import Investor from '../../views/Investor/All'
import NewInvestor from '../../views/Investor/New'
import EditInvestor from '../../views/Investor/Edit'

const networkInterface = createNetworkInterface({ uri: MainApi })


//networkInterface.use([{
 // applyMiddleware (req, next) {
  //  if (!req.options.headers) {
   //   req.options.headers = {}
   // }

    // get the authentication token from local storage if it exists
    //if (localStorage.getItem('graphcoolToken')) {
    //  req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
   // }
    //next()
  //},
//}])



const client = new ApolloClient({ networkInterface })
const history = createBrowserHistory();

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
            <ApolloProvider client={client}>
             <HashRouter history={history}>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                <Route path="/components/cards" name="Cards" component={Cards}/>
                <Route path="/components/forms" name="Forms" component={Forms}/>
                <Route path="/components/modals" name="Modals" component={Modals}/>
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/components/switches" name="Swithces" component={Switches}/>
                <Route path="/components/tables" name="Tables" component={Tables}/>
                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/slider/all" name="Slider" component={Slider}/>
                <Route path="/slider/new" name="New" component={NewSlider}/>
                <Route path="/slider/edit/:id" name="Edit" component={EditSlider}/>
                <Route path="/page/all" name="Page" component={Page}/>
                <Route path="/page/new" name="New" component={NewPage}/>
                <Route path="/page/edit/:id" name="Edit" component={EditPage}/>
                <Route path="/blog/all" name="BLog" component={Blog}/>
                <Route path="/blog/new" name="New" component={NewBlog}/>
                <Route path="/blog/edit/:id" name="Edit" component={EditBlog}/>
                <Route path="/blog/category/all" name="Category" component={CategoryBlog}/>
                <Route path="/blog/category/new" name="New" component={CategoryNew}/>
                <Route path="/blog/category/edit/:id" name="Edit" component={CategoryEdit}/>
                <Route path="/plugin/google" name="Google" component={Google}/>
                <Route path="/plugin/foursquare" name="Foursquare" component={Foursquare}/>
                <Route path="/plugin/mailchimp" name="Mailchimp" component={Mailchimp}/>
                <Route path="/plugin/cloudinary" name="Cloudinary" component={Cloudinary}/>
                <Route path="/plugin/mailgun" name="Mailgun" component={Mailgun}/>
                <Route path="/plugin/sendgrid" name="Sendgrid" component={Sendgrid}/>
                <Route path="/plugin/flickr" name="Flickr" component={Flickr}/>
                <Route path="/setting/meta" name="Meta" component={Meta}/>
                <Route path="/setting/payment" name="Payment" component={Payment}/>
                <Route path="/setting/promo/all" name="Promo" component={Promo}/>
                <Route path="/setting/promo/new" name="New" component={NewPromo}/>
                <Route path="/setting/promo/edit/:id" name="Edit" component={EditPromo}/>
                <Route path="/member/all" name="Member" component={Member}/>
                <Route path="/member/edit/:id" name="Edit" component={EditMember}/>
                <Route path="/member/block" name="Block" component={BlockMember}/>
                <Route path="/member/suspend" name="Suspend" component={SuspendMember}/>

                <Route path="/setting/tempo/all" name="Tempo" component={Tempo}/>
                <Route path="/setting/tempo/new" name="New" component={NewTempo}/>
                <Route path="/setting/tempo/edit/:id" name="Edit" component={EditTempo}/>
                <Route path="/setting/sector/all" name="Sector" component={Sector}/>
                <Route path="/setting/sector/new" name="New" component={NewSector}/>
                <Route path="/setting/sector/edit/:id" name="Edit" component={EditSector}/>
                <Route path="/setting/amount" name="Amount" component={Amount}/>

                <Route path="/invoice/all" name="Invoice" component={Invoice}/>
                <Route path="/invoice/new" name="New" component={NewInvoice}/>
                <Route path="/invoice/edit/:id" name="Edit" component={EditInvoice}/>
                <Route path="/customer/all" name="Customer" component={Customer}/>
                <Route path="/customer/new" name="New" component={NewCustomer}/>
                <Route path="/customer/edit/:id" name="Edit" component={EditCustomer}/>
                <Route path="/customer/block" name="Block" component={BlockCustomer}/>
                <Route path="/customer/suspend" name="Suspend" component={SuspendCustomer}/>
                <Route path="/investor/all" name="Investor" component={Investor}/>
                <Route path="/investor/new" name="New" component={NewInvestor}/>
                <Route path="/investor/edit/:id" name="Edit" component={EditInvestor}/>
                <Route exact path="/charts" name="Charts" component={Charts}/>
                <Route exact path="/login" name="Login Page" component={Login}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </HashRouter>
           </ApolloProvider>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
