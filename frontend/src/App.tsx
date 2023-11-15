import './App.css'
import { ProductForm } from './components/ProductForm';
import { UserForm } from './components/UserForm'
import { OrderForm } from './components/OrderForm'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ploty Product</h1>
        <OrderForm />
        <UserForm />
        <ProductForm />
      </div>
    </ApolloProvider>
  )
}

export default App
