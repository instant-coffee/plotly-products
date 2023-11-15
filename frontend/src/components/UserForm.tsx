import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      age
    }
  }
`;

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ 
        variables: { 
          createUserInput: { name, email, age: parseInt(age, 10) } 
        } 
      });
    } catch (err) {
      // Handle error
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Add User</h2>
      <div className='input'>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='input'>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='input'>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>Add User</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

export { UserForm, CREATE_USER_MUTATION };