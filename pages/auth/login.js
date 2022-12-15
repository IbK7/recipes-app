import Head from 'next/head';
import React from 'react'
import styles from '../../styles/Home.module.css'
import AuthHeader from '../../components/AuthHeader';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../utils/constants';
import { setToken } from '../../utils/helpers';

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  
  const router = useRouter();

  const { setUser } = useAuthContext();


  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const value = {
        identifier: email,
        password: password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
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
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <Head>
          <title>Login</title>
        </Head>
        <AuthHeader page='login' />
        <main className={styles.main}>
          <h3>Welcome back, please login to your account</h3>
          <div className={styles.searchbarDiv}>
            <TextField fullWidth
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            /> <br /> <br />
            <TextField fullWidth
              placeholder='password'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            /> <br /> <br />
            </div>
            <Button variant='contained' onClick={loginHandler}>Login</Button>
        </main>
    </>
  )
}
export default Login;
