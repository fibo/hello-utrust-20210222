import { useCallback, useState } from 'react'

const minQuantity = 1

function CoerceQuantity(value) {
  let quantity = Number(value)
  if (quantity >= minQuantity) return Math.floor(quantity)
  else return minQuantity
}

export function App() {
  const [quantity, setQuantity] = useState(minQuantity)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = useCallback((event) => {
    event.preventDefault()
    console.log('on submit')
    setSubmitting(true)
  }, [])

  const onQuantityChange = useCallback((event) => {
    setQuantity(CoerceQuantity(event.target.value))
  }, [])

  const onKeyDown = useCallback((event) => {
    const isPeriodOrComma = ['Comma', 'Period', 'NumpadDecimal'].includes(
      event.code
    )
    if (isPeriodOrComma) {
      event.preventDefault()
    }
  }, [])

  const onChange = useCallback(
    (event) => {
      setQuantity(event.target.value)
    },
    [setQuantity]
  )

  return (
    <main>
      <header>
        <h1>Hello Utrust</h1>
        <form onSubmit={onSubmit}>
          <input
            onKeyDown={onKeyDown}
            type='number'
            name='quantity'
            step={1}
            min={minQuantity}
            value={quantity}
            onBlur={onQuantityChange}
            onChange={onChange}
          />
          <input type='submit' disabled={submitting} />
        </form>
      </header>
    </main>
  )
}
