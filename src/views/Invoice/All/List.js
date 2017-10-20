import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name} from '../../../views/Api/';
import {Image} from 'cloudinary-react';
import Moment from 'react-moment';
import 'moment/locale/id';
import IntlCurrencyInput from "react-intl-currency-input"
import formatMoney from 'accounting-js/lib/formatMoney.js'

const currencyConfig = {
  locale: "pt-ID",
  formats: {
    number: {
      IDR: {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

class ListBlog extends React.Component {

  static propTypes = {
    invoice: PropTypes.object,
    mutateInvoice: PropTypes.func,
    refresh: PropTypes.func,
  }

    defaultValue = this.props.invoice.price;

   constructor(props) {
    super(props);

    this.state={
      valuex: this.defaultValue,
      maskedValue: this.defaultValue,
    }
    //this.handleChange = this.handleChange.bind(this)
  }

  renderStatus(){
  
    if (this.props.invoice.status == '0'){

        return(

            <span className="badge badge-warning">Pending</span>
          )
    }
     if (this.props.invoice.status == '2'){

        return(

            <span className="badge badge-danger">Cancel</span>
          )
    }
   else{

      return(

            <span className="badge badge-success">Accept</span>
          )
    }

  }

  render () {

  	 var money = formatMoney(this.props.invoice.price, { symbol: "Rp. ", precision: 0, thousand: ".", decimal: "," });
    return (
     
                    <tr>
                      <td>{this.props.invoice.title}</td>
                      <td>
                           {money}
                      </td>
                      <td>
                      <Moment locale="id" format="LL">
                           {this.props.invoice.dueDate}
                        </Moment>
          
                      </td>
                      <td>{this.renderStatus()}</td>
                      <td><i style={{fontSize:30}} className="fa fa-file-text-o"></i> &nbsp; <a href={`${this.props.invoice.imageUrl}`} ><i className="fa fa-cloud-download"></i>&nbsp;Download</a></td>
                      <td width='150'>
                         <Link to={`/invoice/edit/${this.props.invoice.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }              

  handleDelete = async () => {
    await this.props.mutateInvoice({
      variables: {
        id: this.props.invoice.id
      }
    })

    window.location.reload();
  }
}

const deleteInvoice = gql`
  mutation deleteInvoice($id: ID!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteInvoice, {name : 'mutateInvoice'})(ListBlog)

export default PageWithMutation
