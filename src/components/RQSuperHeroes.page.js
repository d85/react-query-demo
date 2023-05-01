import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSuperHeroesData } from '../hooks/useSuperHeroesData'

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

  console.log({ isLoading, isFetching })

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo })
  }

  return (
    <>
      <h2>RQSuperHeroes Page</h2>
      <div>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
        </input>
        <input
          type='text'
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        ></input>
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {
        data?.data.map(hero => {
          return <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        })
      }
    </>
  )
}
