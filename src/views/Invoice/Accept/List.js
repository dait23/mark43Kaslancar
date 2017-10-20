import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name} from '../../../views/Api/';
import {Image} from 'cloudinary-react';
import Moment from 'react-moment';
import 'moment/locale/id';
import Rate from 'rc-rate';
import './index.css';
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


  render () {

    //var xxx = '/slider/edit/'+this.props.slider.id;

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
                      <td>
                      <Rate
                        defaultValue={this.props.invoice.rating}
                        style={{ fontSize: 22 }}
                      />
                      </td>
                      <td width='150'>
                         <Link to={`/invoice/edit/${this.props.invoice.id}`} className="badge badge-info">Edit</Link>
                         
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
