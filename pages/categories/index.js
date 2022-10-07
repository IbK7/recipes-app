import Head from 'next/head'
import Header from '../../components/Header'
import styles from '../../styles/Home.module.css';
import { CardContent, CircularProgress, Grid, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Categories = ({mealCategories}) => {
  return (
    <div> 
      <Head>
          <title>Home | Recipes App</title>
          <meta name="description" content="Homepage of the Recipes application" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <main className={styles.main}>
          <Header />
          {
            !mealCategories ? (
                <CircularProgress color='info' size = '5rem' thickness='3'
                    sx = {{marginTop: '10%'}} 
                />
              ) :
              (
                <>
                <Typography variant='h3'>Meal Categories</Typography>
                <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1} sx = {{flex: "wrap"}}>
                  {
                    mealCategories.map((category) => 
                      <Grid item key={category.idCategory} >
                        <CategoryCard
                          image = {category.strCategoryThumb}
                          title = {category.strCategory}
                          description =  {category.strCategoryDescription}
                        />
                      </Grid>
                    )
                  }
                </Grid>
                </>
              )
          }
        </main>
    </div>
  )
}

export async function getStaticProps(){
    const data = await (await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')).json();
    const mealCategories = data.categories;

    return {
        props: {
            mealCategories,
        }
    }
}

const CategoryCard = (props) => {
  const router = useRouter();

  return(
    <Card 
      variant='outlined' 
      className = {styles.card}
      onClick = {(e) => {
        e.preventDefault();
        router.push(`/categories/${props.title}`)
      }} 
    >
      <CardContent>
        <Image layout='responsive' src={props.image} alt={props.title} height='4' width='10' />
        <h3 align="center">{props.title}</h3>
      </CardContent>
    </Card>
  )
}

export default Categories;