import React from 'react';
import { Link} from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import {Cloudinary_Name} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class ListSlider extends React.Component {

  static propTypes = {
    banner: PropTypes.object,
    mutatePost: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
                      <td>{this.props.banner.title}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.props.banner.description }} ></td>
                      <td>
                      <Image cloudName={Cloudinary_Name} publicId={this.props.banner.imageId} width="200" crop="scale"/>
                    </td>
                      <td width='150'>
                         <Link to={`/slider/edit/${this.props.banner.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        idSlider: this.props.banner.id,
        idFile: this.props.banner.image.id
      }
    })

    window.location.reload();
  }
}

const deleteBanner = gql`
  mutation deleteBanner($idSlider: ID!) {
    deleteBanner(id: $idSlider) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(ListSlider)

export default SliderWithMutation
