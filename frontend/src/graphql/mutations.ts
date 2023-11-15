import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      age
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
      name
      price
    }
  }
`;

export const ADD_PRODUCT_TO_USER_MUTATION = gql`
  mutation AddProductToUserOrder($userId: Int!, $productId: Int!) {
    addProductToUserOrder(userId: $userId, productId: $productId) {
      id
      name
      email
      age
      orders {
        id
        name
        price
      }
    }
  }
`;