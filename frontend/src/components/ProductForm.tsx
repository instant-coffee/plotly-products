import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_MUTATION } from '../graphql/mutations';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ 
        variables: { 
          createProductInput: { name, price: parseFloat(price) } 
        } 
      });
      // Reset form or handle success
      setName('');
      setPrice('');
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Add Product</h2>
      <div className='input'>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='input'>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
        />
      </div>
      <button type="submit" disabled={loading}>Add Product</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

export { ProductForm };
