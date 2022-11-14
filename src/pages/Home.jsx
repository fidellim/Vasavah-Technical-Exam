import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../library/firebaseConfig'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Typography, Box, TextField, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { default_profile } from '../library/constants'

const Home = () => {
    let navigate = useNavigate()
    const [user, setUser] = useState()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const action = (snackbarId) => (
        <IconButton
            aria-label="close"
            onClick={() => {
                closeSnackbar(snackbarId)
            }}
        >
            <CloseIcon />
        </IconButton>
    )

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid
                // setFirebasePath(`users/${uid}/todos`)
                setUser(user)
                console.log(user)
                // setIsSuccess(true)
                // setOpen(true)
            } else {
                // User is signed out
                navigate(`/login`)
            }
        })

        return () => unsubscribe()
    }, [])

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                enqueueSnackbar('Logout is successful!', {
                    action,
                    autoHideDuration: 3000,
                    variant: 'success',
                })
            })
            .catch((error) => {
                enqueueSnackbar(`Cannot signout. Please try again.`, {
                    action,
                    autoHideDuration: 3000,
                    variant: 'error',
                })
            })
    }

    return (
        <>
            {user && (
                <div>
                    Home{' '}
                    <Button variant="outlined" onClick={handleSignOut}>
                        Logout
                    </Button>
                    <img
                        src={user.photoURL ? user.photoURL : default_profile}
                        alt=""
                    />
                </div>
            )}
        </>
    )
}

export default Home
