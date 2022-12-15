import { Grid } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import styles from '../../styles/Home.module.css'
import ErrorPage from 'next/error'
import {Button} from '@mui/material';
import { checkLogin, getToken } from '../../utils/helpers';
import { API } from '../../utils/constants';
import { useAuthContext } from '../../context/AuthContext';

const Meal = ( {newMeal} ) => {

    if (newMeal == null) return <ErrorPage statusCode='404' />
    const [loggedin, setloggedin] = useState(false)
    // const [favMeal, setFavMeal] = useState(null)
    const [favorites, setFavorites] = useState([])

    const [message, setMessage] = useState('')

    const {user} = useAuthContext();
    var currUser = null;

    useEffect(() => {
        setloggedin(checkLogin)

        // console.log(newMeal)
        // if (user) console.log(user);
        const getUserFavorites = async () => {
            if (user) {
                currUser = await (await fetch(`${API}/users/${user.id}?populate=*`)).json()
            }
            
            if (currUser) {
                setFavorites(currUser.favorites)
            }
            // console.log(currUser)
        }

        getUserFavorites();
    }, [user, currUser])

    const addToFavorites = async (event) => {
        event.preventDefault()
        // setMessage('string')
        // console.log(message)
        // check if meal exists in Strapi
        const meal = await (await fetch(`${API}/recipes/${newMeal.idMeal}`)).json()
        var favMeal;
        if (meal.data == null) {
            //adding meal logic goes here
            const mealToAdd = {
                data: newMeal
            }
            const addedMeal = await fetch(`${API}/recipes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mealToAdd)
            })

            const response = await addedMeal.json()
            
            favMeal = response.data;
        } else {
            favMeal = meal.data
        }

        if(favorites.includes(newMeal)) {
            console.log(favorites)
            setMessage("Meal already exists in favourites")
            return
        }

        // console.log(favMeal)
        var newFav = [...favorites, favMeal];

        console.log(newFav)

        
        try{
            const values = {
                favorites: newFav
            }
            const updatedUser = await fetch(`${API}/users/${user.id}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body:  JSON.stringify(values)
            })
            if (updatedUser?.error) throw updatedUser?.error
            else setMessage('Meal Added to favourites')
        } catch(error){
            setMessage("Something went wrong!");
            return
        } 
       
    }
    return (
        <>
            <Head>
                <title> {newMeal.strMeal} </title>
            </Head>
            <Header />
            <main className={styles.randomMain}>
                <h1>{newMeal.strMeal}</h1>

                <Grid container 
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    spacing={10}
                >
                    <Grid item>
                        <Image src={newMeal.strMealThumb} height='500px' width='500px' alt ='Meal Image' />
                    </Grid>
                    <Grid item>
                        <p><b>Category:</b> {newMeal.strCategory}</p>
                        <p><b>Orgin:</b> {newMeal.strArea}</p>
                        <p>Ingredients:</p>
                        <ul>
                            {newMeal.strIngredient1 != "" && newMeal.strIngredient1 != null ? <li>{newMeal.strIngredient1} ({newMeal.strMeasure1}) </li> : null}
                            {newMeal.strIngredient2 != "" && newMeal.strIngredient2 != null ? <li>{newMeal.strIngredient2} ({newMeal.strMeasure2}) </li> : null}
                            {newMeal.strIngredient3 != "" && newMeal.strIngredient3 != null ? <li>{newMeal.strIngredient3} ({newMeal.strMeasure3}) </li> : null}
                            {newMeal.strIngredient4 != "" && newMeal.strIngredient4 != null ? <li>{newMeal.strIngredient4} ({newMeal.strMeasure4}) </li> : null}
                            {newMeal.strIngredient5 != "" && newMeal.strIngredient5 != null ? <li>{newMeal.strIngredient5} ({newMeal.strMeasure5}) </li> : null}
                            {newMeal.strIngredient6 != "" && newMeal.strIngredient6 != null ? <li>{newMeal.strIngredient6} ({newMeal.strMeasure6}) </li> : null}
                            {newMeal.strIngredient7 != "" && newMeal.strIngredient7 != null ? <li>{newMeal.strIngredient7} ({newMeal.strMeasure7}) </li> : null}
                            {newMeal.strIngredient8 != "" && newMeal.strIngredient7 != null ? <li>{newMeal.strIngredient8} ({newMeal.strMeasure8}) </li> : null}
                            {newMeal.strIngredient9 != "" && newMeal.strIngredient9 != null ? <li>{newMeal.strIngredient9} ({newMeal.strMeasure9}) </li> : null}
                            {newMeal.strIngredient10 != "" && newMeal.strIngredient10 != null ? <li>{newMeal.strIngredient10} ({newMeal.strMeasure10}) </li> : null}
                            {newMeal.strIngredient11 != "" && newMeal.strIngredient11 != null ? <li>{newMeal.strIngredient11} ({newMeal.strMeasure11}) </li> : null}
                            {newMeal.strIngredient12 != "" && newMeal.strIngredient12 != null ? <li>{newMeal.strIngredient12} ({newMeal.strMeasure12}) </li> : null}
                            {newMeal.strIngredient13 != "" && newMeal.strIngredient13 != null ? <li>{newMeal.strIngredient13} ({newMeal.strMeasure13}) </li> : null}
                            {newMeal.strIngredient14 != "" && newMeal.strIngredient14 != null ? <li>{newMeal.strIngredient14} ({newMeal.strMeasure14}) </li> : null}
                            {newMeal.strIngredient15 != "" && newMeal.strIngredient15 != null ? <li>{newMeal.strIngredient15} ({newMeal.strMeasure15}) </li> : null}
                            {newMeal.strIngredient16 != "" && newMeal.strIngredient16 != null ? <li>{newMeal.strIngredient16} ({newMeal.strMeasure16}) </li> : null}
                            {newMeal.strIngredient17 != "" && newMeal.strIngredient17 != null ? <li>{newMeal.strIngredient17} ({newMeal.strMeasure17}) </li> : null}
                            {newMeal.strIngredient18 != "" && newMeal.strIngredient18 != null ? <li>{newMeal.strIngredient18} ({newMeal.strMeasure18}) </li> : null}
                            {newMeal.strIngredient19 != "" && newMeal.strIngredient19 != null ? <li>{newMeal.strIngredient19} ({newMeal.strMeasure19}) </li> : null}
                            {newMeal.strIngredient20 != "" && newMeal.strIngredient20 != null ? <li>{newMeal.strIngredient20} ({newMeal.strMeasure20}) </li> : null}
                        </ul>
                    </Grid>
                </Grid>
                <div className={styles.instruction}>
                    <h3>Instructions</h3>
                    <p className=''>{newMeal.strInstructions}</p>
                </div>
                {
                    loggedin ? (
                        <div className={styles.favurites}>
                            <Button variant='contained' onClick={addToFavorites}>
                                Add to Favorites
                            </Button>
                        </div>
                    ) : null
                }
                <div>
                    {message}
                </div>
            </main>
        </>
    )
}

export async function getStaticPaths() {
    
    return {
      paths: [
        {params: {
            meal: '52772'
        }},
        {params: {
            meal: '53050'
        }},
      ],
      fallback: 'blocking',
    }
}
  
  export async function getStaticProps({params}) {
    const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.meal}`)).json();

    var newMeal = null;
    if (data.meals != null) newMeal = data.meals[0]

    return {
      props: {
        newMeal,
      }
    }
  }

export default Meal;