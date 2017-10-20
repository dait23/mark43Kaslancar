import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { Button} from 'reactstrap';
import {MainLink} from '../../../../views/Api/';
import { graphql, gql, compose } from 'react-apollo'
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';

const history = createBrowserHistory();



class CategoryNew extends Component {

  static propTypes = {
    router: PropTypes.object,
    addCategory: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    name: '',
    slug: '',
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

 
  
  handleChange(value) {
    this.setState({ name: value});
  }

 
  render() {

    const { content } = this.state
    var slugg = this.state.name;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();
    console.log(sluger);
 

    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Category
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
    
                    <div className="col-md-9">
                      <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/blog/category/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    //this.setState({slug: slug, imageId})
   
    const {name, slug} = this.state
    await this.props.addCategory({variables: { 
      name, 
      slug
    }})

   //history.push('#/slider/all');
   window.location= MainLink + "blog/category/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addCategory($name: String!,$slug: String!) {
    createCategory(name: $name, slug: $slug) {
      id
      name
      slug
      
    }
  }
`

//const PageWithMutation = graphql( addMutation, { name: 'addBlog' })(NewBlog)
//const ListPageWithData = graphql(FeedQuery)
//export default withRouter(PageWithMutation)

const PageWithMutation = graphql(addMutation, { name: 'addCategory' })(CategoryNew)

export default withRouter(PageWithMutation)