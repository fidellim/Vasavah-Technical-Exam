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
                <Box
                    sx={{
                        padding: '1rem',
                        backgroundColor: '#edf6f9',
                        minHeight: '100vh',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <Button variant="outlined" onClick={handleSignOut}>
                                Logout
                            </Button>
                            <Box
                                sx={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={
                                        user.photoURL
                                            ? user.photoURL
                                            : default_profile
                                    }
                                    alt={user.displayName}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default Home
