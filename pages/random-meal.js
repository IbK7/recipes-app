import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CircularProgress, Button } from '@mui/material'
import Header from '../components/Header'

// const fetcher = (...args) => fetch(...args).then((res) => res.json())


const RandomMeal = ( {meal} ) => {

    const [newMeal, setNewMeal] = useState(meal)
    const [isLoading, setLoading] = useState(false)

    const generateRandom = () => {
        setLoading(true)
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((data) => {
            setNewMeal(data.meals[0])
            setLoading(false)
        })
    }

    return (
      <div className={styles.container}>
        <Head>
          <title>Random Generator | Recipes App</title>
          <meta name="description" content="Homepage of the Recipes application" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <main className={styles.main}>
          <Header />
          {
            isLoading || !newMeal ? (
              <CircularProgress color='info' size = '5rem' thickness={3}
                    sx = {{marginTop: '10%'}} 
                />
            ) : (
              <>
                <h1>Random Meal Generator</h1>
                <Image src={newMeal.strMealThumb} height='500px' width='500px' alt ='Meal Image' />
                <h3>{newMeal.strMeal}</h3> 
                <p><b>Category:</b> {newMeal.strCategory}</p>
                <p><b>Orgin:</b> {newMeal.strArea}</p>
                <p>{newMeal.strInstructions}</p>
                
                <Button variant='outlined' onClick={generateRandom} sx = {{borderColor:'#982121', color: '#982121'}} >Generate New</Button>
              </>
            )
          }
        </main>
      </div>
    )
}

export async function getServerSideProps(context) {
  const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/random.php')).json()
  const meal = data.meals[0]

  return {
    props: {
      meal,
    }
  }
}

export default RandomMeal;