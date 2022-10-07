import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header';
import { CardContent, CircularProgress, Grid, Card, Typography } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Home.module.css'
import ErrorPage from 'next/error'

const CategoryName = ({ meals }) => {
  const router = useRouter();
  const {categoryName} = router.query; 

  if (!meals) return <ErrorPage statusCode='404' />

  return (
    <div>
        <Head>
            <title> {categoryName} | Recipes App</title>
          <meta name="description" content="Homepage of the Recipes application" />
        </Head>
        <main className={styles.main}>
            <Header />
            <Typography variant='h3'>Meals </Typography>
            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1} sx = {{flex: "wrap"}}>
              {
                meals.map((meal) => 
                  <Grid item key={meal.idMeal} >
                    <MealCard
                      image = {meal.strMealThumb}
                      title = {meal.strMeal}
                    />
                  </Grid>
                )
              }
            </Grid>

        </main>

    </div>
  )
}

const MealCard = (props) => {
    return(
      <Card variant='outlined' 
      className={styles.card}
      >
        <CardContent>
          <Image layout='responsive' src={props.image} alt={props.title} height='4' width='10' />
          <h3 align="center">{props.title}</h3>
        </CardContent>
      </Card>
    )
}

// export const getStaticProps = async () => {
//     const router = useRouter();
//     const {categoryName} = router.query; 

//     const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)).json();
//     const meals = data.meals;

//     return {
//         props: {
//             meals,
//         }
//     }
// }

export async function getStaticPaths() {
  // Return a list of possible value for categoryName

  const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')).json();
  const mealCategories = data.categories;

  var categoryPaths = [];
  // console.log(mealCategories[0].strCategory);
  for (let i = 0; i < mealCategories.length; i++ ) {
    categoryPaths.push({params: {categoryName: mealCategories[i].strCategory}})
  }

  // console.log(categoryPaths)

  return {
    // paths: [{params: {categoryName: '404'}}, {params: {categoryName: 'None'}}],
    paths: categoryPaths,
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  // Fetch necessary data for the blog post using params.categoryName
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.categoryName}`)).json();
  const meals = data.meals;

  return {
    props: {
      meals,
    }
  }
}

export default CategoryName;