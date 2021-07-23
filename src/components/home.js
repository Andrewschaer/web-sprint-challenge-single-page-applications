import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Home() {
  // 👉 STEP 5 - Build a click handler that will imperatively
  // navigate us to <website base URL>/items-list
  const history = useHistory()
  const routeToOrderForm = () => {
    history.push('/pizza')
  }

  return (
    <div className='home-wrapper'>
      <img
        className='homerlisapizza-image'
        src='https://i.pinimg.com/originals/e2/8d/90/e28d90f4ac443db6022609cd71c7547a.jpg'
        alt='Homer and Lisa Simpson sharing a Doh Pie in the Kitchen'
      />
      <button
        onClick={routeToOrderForm}
        className='home-order-pizza'
      >
        Order now!
      </button>
    </div>
  )
}