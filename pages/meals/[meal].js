import { Grid } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import Header from '../../components/Header';
import styles from '../../styles/Home.module.css'
import ErrorPage from 'next/error'

const Meal = ( {newMeal} ) => {

    if (newMeal == null) return <ErrorPage statusCode='404' />
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
            </main>
        </>
    )
}

export async function getStaticPaths() {
    // const router = useRouter();
    // const {meal} = router.query;

    // const data = await (await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)).json();
    // const mealCategories = data.categories;
  
    // var categoryPaths = [];
    // for (let i = 0; i < mealCategories.length; i++ ) {
    //   categoryPaths.push({params: {categoryName: mealCategories[i].strCategory}})
    // }
  
    return {
      paths: [
        {params: {
            meal: '52772'
        }},
        {params: {
            meal: '53050'
        }},
      ],
      fallback: true,
    }
  }
  
  export async function getStaticProps({params}) {
    const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.meal}`)).json();
    const newMeal = data.meals[0];

    return {
      props: {
        newMeal,
      }
    }
  }

export default Meal;