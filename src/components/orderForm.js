import React from 'react'

export default function Form(props) {
    const { 
        values,
        change,
        submit,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }

    return (
        
        <form className='form container' id='pizza-form' onSubmit={onSubmit}>
            <h2>Order Your Pie Below</h2>
            
            <div>
                <label>What's Your Name?&nbsp;
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                        id='name-input'
                    />
                    <div>
                        {errors.name}
                    </div>
                </label>
            </div>
            <div>
                <label>How Big You Want Your D'oh Pie?&nbsp;
                    <select
                        value={values.size}
                        onChange={onChange}
                        name='size'
                        id='size-dropdown'
                    >
                        <option value=''>- Select an Size -</option>
                        <option value='small'>Small - 12inch (Personal)</option>
                        <option value='medium'>Medium - 16inch (For 2-3)</option>
                        <option value='large'>Large - 20inch (For 3-4)</option>
                        <option value='extraLarge'>Extra Large - 24inch (Mmmmmm.... Pizza)</option>
                    </select>
                    {errors.size}
                </label>
            </div>
            <div className='form-toppings checkboxes'>
                <h4>What You Want On It?</h4>
                <label>Pepperoni
                <input
                    type='checkbox'
                    name='pepperoniTopping'
                    onChange={onChange}
                    checked={values.pepperoniTopping}
                />
                </label>

                <label>Donuts
                <input
                    type='checkbox'
                    name='donutsTopping'
                    onChange={onChange}
                    checked={values.donutsTopping}
                />
                </label>

                <label>Veggies (Yuck!)
                <input
                    type='checkbox'
                    name='veggiesTopping'
                    onChange={onChange}
                    checked={values.veggiesTopping}
                />
                </label>
                <label>Extra Cheese
                <input
                    type='checkbox'
                    name='extraCheeseTopping'
                    onChange={onChange}
                    checked={values.extraCheeseTopping}
                />
                </label>
            </div>
            <div>
                <label>You Got Something Else to Say?&nbsp;
                    <input
                        value={values.special}
                        onChange={onChange}
                        name='special'
                        type='text'
                        id='special-text'
                    />
                    {errors.special}
                </label>
            </div>
            <br></br>
            <div>
                <button disabled={disabled} id='order-button'>Order Now!</button>
            </div>
            
        </form>
    )

}