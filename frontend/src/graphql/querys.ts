import { gql } from '@apollo/client';

export const CHECK_USER_QUERY = gql`
  query GetUserByName($name: String!) {
    getUserByName(name: $name) {
      id
      name
      email
      age
    }
  }
`;

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts {
    products {
      id
      name
      price
    }
  }
`;