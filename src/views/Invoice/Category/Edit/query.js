import { graphql, gql, compose } from 'react-apollo'

export default gql`
  query BlogCategory($id: ID!) {
    BlogCategory(id: $id){
    id
    name
    slug
  }
  }
`;
