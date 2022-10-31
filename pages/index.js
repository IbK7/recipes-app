import Head from 'next/head'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import styles from '../styles/Home.module.css';
import { CardContent, CircularProgress, Grid, Card, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function Home() {
  return (
    <> 
      <Head>
          <title>Home | Recipes App</title>
          <meta name="description" content="Homepage of the Recipes application" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <Header />
        <main className={styles.main}>
              This is the main pages
        </main>
    </>
  )
}