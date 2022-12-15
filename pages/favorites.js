import Head from 'next/head';
import React, {useEffect, useState} from 'react'
import Header from '../components/Header';
import { checkLogin, getToken } from '../utils/helpers';
import { useAuthContext } from '../context/AuthContext';
import styles from '../styles/Home.module.css'
import { API } from '../utils/constants';
import { getURL } from 'next/dist/shared/lib/utils';
import { CircularProgress } from '@mui/material';
import MealCard from '../components/MealCard';

const Profile = () => {

    const [loggedin, setloggedin] = useState(false)
    const [favorites, setFavorites] = useState([])

    const {user} = useAuthContext();
    var currUser = null;
    
    useEffect(() => {
        setloggedin(checkLogin)

        // console.log(newMeal)
        // if (user) console.log(user);
        const getUserFavorites = async () => {
            if (user) {
                currUser = await (await fetch(`${API}/users/${user.id}?populate=*`)).json()
            }
            
            if (currUser) {
                setFavorites(currUser.favorites)
            }
            // console.log(currUser)
        }

        getUserFavorites();
    }, [user, currUser])
    

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />
            <main className={styles.main}>
                <h1>Favourites</h1>
                {
                    !loggedin ? (
                        <div>
                            Please Log in
                        </div>
                    ) : (
                        favorites.length === 0 ? (
                            <div>
                                Favourites will appear here
                            </div>
                        ) : (
                            <MealCard meals = {favorites} />
                        )
                    )
                }
            </main>
        </>
    )
}

export default Profile;
