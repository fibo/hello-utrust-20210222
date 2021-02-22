import { useState } from 'react'

const minQuantity = 1

function CoerceQuantity(value) {
  let quantity = Number(value)
  if (quantity >= minQuantity) return Math.floor(quantity)
  else return minQuantity
}

export function App() {
  const [quantity, setQuantity] = useState(minQuantity)
  const onSubmit = (event) => {
    event.preventDefault()
    console.log('on submit')
  }
  const onQuantityChange = (event) => {
    setQuantity(CoerceQuantity(event.target.value))
  }
  return (
    <main>
      <header>
        <h1>Hello Utrust</h1>
        <form onSubmit={onSubmit}>
          <input
            onKeyDown={(event) => {
              const isPeriodOrComma = [
                'Comma',
                'Period',
                'NumpadDecimal'
              ].includes(event.code)

              if (isPeriodOrComma) {
                event.preventDefault()
              }
            }}
            type='number'
            name='quantity'
            step={1}
            min={minQuantity}
            value={quantity}
            onBlur={onQuantityChange}
            onChange={(event) => {
              setQuantity(event.target.value)
            }}
          />
          <input type='submit' />
        </form>
      </header>
    </main>
  )
}
