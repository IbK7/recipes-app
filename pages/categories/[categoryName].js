import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../components/Header';
import { CardContent, Grid, Card, Typography } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Categories.module.css'
import ErrorPage from 'next/error'

const CategoryName = ({ meals }) => {
  const router = useRouter();
  const {categoryName} = router.query; 

  if (!meals) return <ErrorPage statusCode='404' />

  return (
    <>
        <Head>
            <title> {categoryName} | Recipes App</title>
          <meta name="description" content="Homepage of the Recipes application" />
        </Head>
        <Header />
        <main className={styles.main}>
          <Typography variant='h3'>Meals </Typography>

            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1} sx = {{flex: "wrap"}}>
              {
                meals.map((meal) => 
                  <Grid item key={meal.idMeal} 
                  onClick = {() => router.push(`/meals/${meal.idMeal}`)}
                  >
                    <Card variant='outlined' className={styles.card}>
                      <Grid container direction='column' justifyContent='center' alignItems='center' >
                        <Grid item 
                          className={styles.imgContainer}
                        >
                          <Image 
                            src = {meal.strMealThumb} 
                            alt={meal.strMeal} 
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant='body1'>
                            {meal.strMeal}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )
              }
            </Grid>

        </main>
    </>
  )
}

export async function getStaticPaths() {
  const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')).json();
  const mealCategories = data.categories;

  var categoryPaths = [];
  for (let i = 0; i < mealCategories.length; i++ ) {
    categoryPaths.push({params: {categoryName: mealCategories[i].strCategory}})
  }

  return {
    paths: categoryPaths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const data = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.categoryName}`)).json();
  const meals = data.meals;
  
  return {
    props: {
      meals,
    }
  }
}

export default CategoryName;