import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT_TO_USER_MUTATION, CREATE_USER_MUTATION } from '../graphql/mutations';
import { CHECK_USER_QUERY, GET_PRODUCTS_QUERY } from '../graphql/querys';
import { useDebounce } from '../utils/debounce';

const OrderForm = () => {
  const [userName, setUserName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [message, setMessage] = useState('');
  
  const debouncedUserName = useDebounce(userName, 500);

  // Query to check if user exists
  const { data: userData, loading: userLoading } = useQuery(CHECK_USER_QUERY, {
    //workaround for not calling query on empty string or too many calls 
    variables: { name: debouncedUserName },
    skip: userName.length < 3,
  });
  // Query to get all products
  const { data: productsData } = useQuery(GET_PRODUCTS_QUERY);

  const [createUser, {loading: createUserLoading }] = useMutation(CREATE_USER_MUTATION);
  const [addProductToUser, { loading: addProductLoading }] = useMutation(ADD_PRODUCT_TO_USER_MUTATION);

  const handleAddProduct = async () => {
    try {
      let userId;
      console.log("🚀 ~ file: OrderForm.tsx:49 ~ handleAddProduct ~ userData:", userData.getUserByName)
      if (!userData) {
        // User does not exist, create a new user
        // TODO provide a way to input age and email perhaps a modal with UserForm
        const newUser = await createUser({ variables: { name: userName, email: "guest@email.com", age: 42 } });
        userId = newUser.data.createUser.id;
      } else {
        userId = parseInt(userData.getUserByName.id);
      }

      // Add the product to the user's orders
      console.log("🚀 ~ file: OrderForm.tsx:41 ~ handleAddProduct ~ selectedProductId:", selectedProductId)
      const productId = selectedProductId;
      await addProductToUser({ variables: { userId, productId } });
      setMessage(`Product ${selectedProductId} added to ${userName}'s orders.`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className='form'>
      <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="User Name" />
      {productsData && (
        <select
          value={selectedProductId}
          onChange={e => setSelectedProductId(parseInt(e.target.value))}
        >
          <option value="">Select a Product</option>
          {productsData.products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      )}
      <button onClick={handleAddProduct} disabled={userLoading || createUserLoading || addProductLoading}>Add Product to Order</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export { OrderForm };
