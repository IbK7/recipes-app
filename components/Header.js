import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router';
import { getToken, removeToken } from '../utils/helpers';

const Header = () => {
  const router = useRouter();
  const [loggedin, setloggedin] = useState(false)
  
  useEffect(() => {
    const authToken = getToken();
    if (authToken) setloggedin(true)
  }, [])

  const logout = () => {
    removeToken();
    router.push('/auth/login')
  }

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
          <Link href='/search'>Search a Meal</Link>
        </div>
        {
          loggedin ? (
            <>
              <div className={styles.link}>
                <Link href='/favorites'>Favourites</Link>
              </div>
              <div className={styles.link} onClick={logout}>
              Logout
            </div>
            </>
          ) : (
            <div className={styles.link}>
              <Link href='/auth/login'>Login</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Header;