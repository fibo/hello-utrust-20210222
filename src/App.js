export function App() {
  const onSubmit = (event) => {
    event.preventDefault()
    console.log('on submit')
  }
  return (
    <main>
      <header>
        <h1>Hello Utrust</h1>
        <form onSubmit={onSubmit}>
          <input type='number' />
          <input type='submit' />
        </form>
      </header>
    </main>
  )
}
