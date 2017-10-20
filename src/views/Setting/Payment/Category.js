import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Category extends Component {

  static propTypes = {
    category: PropTypes.object,
    refresh: PropTypes.func,
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                <option value={this.props.category.id}>{this.props.category.name}</option>    
    )
  }

}
export default Category;
