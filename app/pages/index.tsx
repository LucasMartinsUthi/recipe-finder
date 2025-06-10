import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        console.log('Data fetched:', data)
      })
  }, [])

  return (
    <div>
      Hello World!
    </div>
  );
}
