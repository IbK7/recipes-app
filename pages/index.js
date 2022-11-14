import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import styles from '../styles/Home.module.css';
import { IconButton, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import MealCard from '../components/MealCard';

export default function Home() {
  const [searchVal, setSearchVal] = useState("")
  const [options, setOptions] = useState([])

  const getSearchResults = async () => {
    const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchVal}`)).json()
    setOptions(data.meals)
  }

  const enterPressHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      getSearchResults()
    }
  }

  return (
    <> 
      <Head>
          <title>Home | Recipes App</title>
          <meta name="description" content="Homepage of the Recipes application" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <Header />
        <main className={styles.main}>
        <div className={styles.searchbarDiv}>
          <TextField fullWidth
            id = "searchText"
            placeholder='Search...'
            onChange={(event) => {setSearchVal(event.target.value)}}
            onKeyDown={enterPressHandler}
            InputProps= {{
              endAdornment:<IconButton onClick={getSearchResults} ><SearchOutlined /></IconButton>
            }}
          />
          </div>
          <div className={styles.searchResult}>
            {options == null ? <div>No results found</div> : <MealCard meals={options} />}
          </div>
        </main>
    </>
  )
}

