import Head from 'next/head';
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../components/Header';
import { Typography } from '@mui/material';
import styles from '../../styles/Categories.module.css'
import ErrorPage from 'next/error'
import MealCard from '../../components/MealCard';

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
            <MealCard meals={meals} />
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