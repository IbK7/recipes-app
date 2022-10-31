import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import React from 'react'
import Link from 'next/link';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div>
        <IconButton 
        sx = {{color: 'black'}}
        onClick = {(e) => {
          e.preventDefault()
          router.push('/')
        }}
        >
          <RestaurantMenuIcon />
        </IconButton>
      </div>
      <div className={styles.linkContainer}>
        <div className={styles.link}>
          <Link href='/random-meal'>Meal Randomizer</Link>
        </div>
        <div className={styles.link}>
          <Link href='/categories'>Categories</Link>
        </div>
      </div>
    </div>
  )
}

export default Header;