import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import React from 'react'
import Link from 'next/link';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  return (
    <AppBar position="static">
    <Toolbar sx={{backgroundColor:'#982121'}}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2, }}
        onClick = {(e) => {
          e.preventDefault();
          router.push('/')
        }}
      >
        <RestaurantMenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Recipes App
      </Typography>
      <div className={styles.link}><Link href='/categories'>Categories</Link></div>
      <div className={styles.link}><Link href='/random-meal'>Meal Randomizer</Link></div>
    </Toolbar>
  </AppBar>
  )
}

export default Header;
