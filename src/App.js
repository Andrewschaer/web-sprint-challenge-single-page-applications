import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import schema from './validation/formSchema.js'
import { reach } from 'yup'
import './index.css';
import Home from './components/home.js'
import OrderForm from './components/orderForm.js'


// Initial States

const initialFormValues = {
  name: '',
  size: '',
  pepperoniTopping: false,
  donutsTopping: false,
  veggiesTopping: false,
  extraCheeseTopping: false,
  special: '',
}

const initialFormErrors = {
  name: '',
  size: '',
}

const initialOrders = []
const initialDisabled = true

function App() {
  // State Declarations
  const [orders, setOrders] = useState(initialOrders)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // Helper Functions
  const postNewOrder = newUser => {
    axios.post('https://reqres.in/api/orders', newUser)
      .then (res => {
        setOrders([res.data, ...orders])
        console.log('Order Submission Status:', res.status, 'Order Submission Values:', res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const validate = (name, value) => {
    reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  // Event Handlers

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmitOrder = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      pepperoniTopping: formValues.pepperoniTopping,
      donutsTopping: formValues.donutsTopping,
      veggiesTopping: formValues.veggiesTopping,
      extraCheeseTopping: formValues.extraCheeseTopping,
      special: formValues.special.trim(),     
    }
    postNewOrder(newOrder)
  }

  // Side Effects
  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='App'>
      <nav>
        <h1 className='store-header'>Homer&apos;s D&apos;oh Pies</h1>
        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link id='order-pizza' to='/pizza'>Order A D&apos;oh Pie</Link>
        </div>
      </nav>
      <Switch>
        <Route path='/pizza'>
          <OrderForm 
            values={formValues}
            change={inputChange}
            submit={formSubmitOrder}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
export default App;

