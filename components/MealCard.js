import { Grid, Card, Typography } from '@mui/material';
import React from 'react'
import Image from 'next/image';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

const MealCard = (props) => {
    const {meals} = props
    const router = useRouter();

    return (
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
    )
}

export default MealCard;