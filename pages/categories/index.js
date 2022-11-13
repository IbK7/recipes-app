import React from 'react';
import Head from 'next/head'
import styles from '../../styles/Categories.module.css'
import { Grid, Typography, Card, CardContent } from '@mui/material'
import Image from 'next/image';
import Header from '../../components/Header'
import { useRouter } from 'next/router';

export default function Categories( {mealCategories} ) {
  const router = useRouter();
  
  // React.useEffect(() => {
  //   console.log(mealCategories);
  // })

  return (
    <div className={styles.container}>
      <Head>
        <title>Meal Categories</title>
        <meta name="description" content="Meal categories you can choose from" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Typography variant='h3' className = {styles.heading} >Meal Categories</Typography>
        <Grid 
        container 
        direction="row" 
        alignItems="center" 
        justifyContent='center' 
        spacing={2} 
        >
          {
            mealCategories.map((category) => 
              <Grid item key={category.idCategory}
              onClick= {(e) => {
                e.preventDefault();
                router.push(`/categories/${category.strCategory}`)
              }}>
                <Card 
                  variant='outlined' 
                  className = {styles.card}  
                >
                  <Grid container direction='row' justifyContent='space-evenly' alignItems='center'>
                    <Grid item className={styles.imgContainer}>
                      <Image 
                      src = {category.strCategoryThumb} 
                      alt={category.strCategory} 
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant='body1'>
                        {category.strCategory}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )
          }
        </Grid>
      </main>
    </div>
  )
}

export async function getStaticProps(){
    const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')).json();
    const mealCategories = data.categories;

    // console.log(data.categories)
    return {
        props: {
            mealCategories,
        }
    }
}


// import Link from 'next/link'
// import { useRouter } from 'next/router'

// export default function Collection() {
//   const router = useRouter()
//   const {collection} = router.query;

//   return (
//     <div>
//       <main>
//         <h1>This is '/pages/collections/{collection}' </h1>
//         <Link href='/'>Home</Link>
//       </main>
//     </div>
//   )
// }

// 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