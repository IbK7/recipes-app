import React from 'react';
import Head from 'next/head'
import styles from '../styles/Test.module.css'
import { Grid, Typography, Card, CardContent } from '@mui/material'
import Image from 'next/image';

export default function Home( {mealCategories} ) {

  // React.useEffect(() => {
  //   console.log(mealCategories);
  // })

  return (
    <div className={styles.container}>
      <Head>
        <title>Meal Categories</title>
        <meta name="description" content="Meal categories you can choose from" />
      </Head>

      <main className={styles.main}>
        <Typography variant='h3' className = {styles.heading} >Meal Categories</Typography>
        <Grid 
        container 
        direction="row" 
        alignItems="center" 
        justifyContent='center' 
        spacing={2} >
          {
            mealCategories.map((category) => 
              <Grid item key={category.idCategory}>
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

// import React from 'react'
// import Link from 'next/link';
// import styles from '../styles/Header.module.css'
// import { useRouter } from 'next/router';

// const Header = () => {
//   const router = useRouter();

//   const handleHomeRoute = (e) => {
//     e.preventDefault()
//     router.push('/')
//   }

//   return (
//     <div className={styles.container}>
//       <div 
//         className={styles.link}
//         onClick = {handleHomeRoute}
//       >
//         Home
//       </div>
//     </div>
//   )
// }

// export default Header;

// .container {
//   width: 100vw;
//   position: fixed;
//   top: 0;
//   height: 8vh;
//   background-color: #b24724;
//   opacity: 80%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   z-index: 2;
// }

// .linkContainer {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;
// }

// .link {
//   margin: 1rem;
//   border-bottom: 1px solid black;
//   color: black;
//   cursor: pointer;
//   opacity: 100%;
// }