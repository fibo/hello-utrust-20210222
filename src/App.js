import { useCallback, useEffect, useState } from 'react'

const minQuantity = 1

function CoerceQuantity(value) {
  let quantity = Number(value)
  if (quantity >= minQuantity) return Math.floor(quantity)
  else return minQuantity
}

const endpoint = {
  payUtrust: 'https://4x715wi6k8.execute-api.us-east-1.amazonaws.com/pay/utrust'
}

const api = {
  createOrder: () =>
    fetch(endpoint.payUtrust, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject({ status: res.status, message: res.statusText })
    })
}

export function App() {
  const [quantity, setQuantity] = useState(minQuantity)
  const [submitting, setSubmitting] = useState(false)
  const [redirectURI, setRedirectURI] = useState('')

  useEffect(() => {
    if (redirectURI) {
      window.location = redirectURI
    }
  }, [redirectURI])

  const onSubmit = useCallback((event) => {
    event.preventDefault()
    setSubmitting(true)

    api.createOrder().then(
      ({ redirectURI: target }) => {
        setSubmitting(false)
        setRedirectURI(target)
      },
      (error) => {
        console.error(error)
      }
    )
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
