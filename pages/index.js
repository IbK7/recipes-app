import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import styles from '../styles/Home.module.css';
import { CardContent, CircularProgress, Grid, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function Home() {
  return (
    <div> 
      <Head>
          <title>Home | Recipes App</title>
          <meta name="description" content="Homepage of the Recipes application" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <main className={styles.main}>
          <Header />
          This is the home page
        </main>
    </div>
  )
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