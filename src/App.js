import axios from 'axios'
import { useEffect, useState } from 'react'
import { Route, Link, Switch, Redirect} from 'react-router-dom'
import schema from './validation/formSchema.js'
import { reach } from 'yup'
import './index.css';
import Home from './components/home.js'
import OrderForm from './components/orderForm.js'


// Initial States

const initialFormValues = {
  // Text Inputs
  name: '',
  username: '',
  email: '',
  // Password Inputs
  password: '',
  // Dropdown Inputs
  userRole: '',
  // Date Inputs
  birthday: '',
  // File Inputs
  profilePic: '',
  // Checkbox Inputs
  tos: '',
}

const initialFormErrors = {
  name: '',
  username: '',
  email: '',
  password: '',
  userRole: '',
  birthday: '',
  tos: '',
}

const initialUsers = []
const initialDisabled = true

function App() {
  // State Declarations
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  // Helper Functions
  const postNewUser = newUser => {
    axios.post('https://reqres.in/api/orders', newUser)
      .then (res => {
        setUsers([res.data, ...users])
        console.log('UPDATE TO GET CORRECT SUCCESS RESPONSE', res)
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

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      userRole: formValues.userRole.trim(),
      birthday: formValues.birthday.trim(),
      tos: formValues.tos,
      profilePic: formValues.profilePic.trim(),
    }
    postNewUser(newUser)
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
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
        {/* <Redirect to='/' /> */}
      </Switch>
    </div>
  );
};
export default App;

