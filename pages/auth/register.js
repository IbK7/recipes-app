import Head from 'next/head';
import React, {useState} from 'react'
import styles from '../../styles/Home.module.css'
import AuthHeader from '../../components/AuthHeader';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../utils/constants';
import { setToken } from '../../utils/helpers';

const Register = () => {
    const router = useRouter();
    const { setUser } = useAuthContext();
    
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const onFinish = async () => {
        const values = {
            username: username,
            password: password,
            email: email,
        }
        setIsLoading(true);
        try {
          const response = await fetch(`${API}/auth/local/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
    
          const data = await response.json();
          if (data?.error) {
            throw data?.error;
          } else {
            // set the token
            setToken(data.jwt);
    
            // set the user
            setUser(data.user);
    
            router.push('/')
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <AuthHeader page='register' />
            <main className={styles.main}>
                <h3>Welcome back, please login to your account</h3>
                <div className={styles.searchbarDiv}>
                    <TextField fullWidth
                    placeholder='Username'
                    onChange={(e)=> {setUsername(e.target.value)}}
                    /> <br /> <br />

                    <TextField fullWidth
                    placeholder='Email'
                    onChange={(e) => {setEmail(e.target.value)}}
                    /> <br /> <br />

                    <TextField fullWidth
                    placeholder='Password'
                    type='password'
                    onChange={(e) => {setPassword(e.target.value)}}
                    /> <br /> <br />
                </div>
                <Button disabled={isLoading} variant='contained' onClick={onFinish}>Register</Button>

                {
                    isLoading ? <CircularProgress /> : null
                }
            </main>
        </>
    )
}

export default Register;
