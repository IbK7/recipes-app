import Head from 'next/head';
import React, {useEffect, useState} from 'react'
import Header from '../../components/Header';
import { checkLogin, getToken } from '../../utils/helpers';
import { useAuthContext } from '../../context/AuthContext';
import styles from '../../styles/Home.module.css'
import { API } from '../../utils/constants';

const User = ({user}) => {

    const [loggedin, setloggedin] = useState(false)

    useEffect(() => {
        setloggedin(checkLogin)
        console.log(user)
    }, [])
    
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
                            Please sign in to your account to see favourites
                        </div>
                    ) : (
                        <div>
                            Favourites go here
                        </div>
                    )
                }
            </main>
        </>
    )
}


export async function getStaticPaths(){
    return {
        paths
    }
}
export async function getStaticProps({params}){
    const user = params.user;

    // const user = await (await fetch(`${API}/users/${userId}`)).json()

    return {
        props: {
            user
        }
    }
    
}

export default User;
