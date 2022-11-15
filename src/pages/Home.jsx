import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../library/firebaseConfig'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Typography, Box, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { default_profile } from '../library/constants'
import DigitalClock from '../components/DigitalClock'
import { addLog, queryLogs } from '../database'
import { onSnapshot } from 'firebase/firestore'
import Logs from '../components/Logs'

const Home = () => {
    let navigate = useNavigate()
    const clockSnoozeButtonRef = useRef()
    const [user, setUser] = useState()
    const [attendance, setAttendance] = useState()
    const [logs, setLogs] = useState()
    const [isClockIn, setIsClockIn] = useState(true)
    const [firebasePath, setFirebasePath] = useState()
    const dateTimeString = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    }

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
        const unsubscribe =
            firebasePath &&
            onSnapshot(queryLogs(firebasePath), (querySnapshot) => {
                setLogs(
                    querySnapshot.docs.map((doc) => {
                        // add doc.id to have reference for each todo
                        return { ...doc.data(), id: doc.id }
                    })
                )
            })

        return () => firebasePath && unsubscribe()
    }, [firebasePath])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid
                setFirebasePath(`users/${uid}/logs`)
                setUser(user)
                // console.log(user)
            } else {
                // User is signed out
                navigate(`/login`)
            }
        })

        return () => unsubscribe()
    }, [navigate])

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

    const handleClockSnooze = () => {
        clockSnoozeButtonRef.current.classList.remove('clock__snooze')
        void clockSnoozeButtonRef.current.offsetWidth
        clockSnoozeButtonRef.current.classList.add('clock__snooze')
        setIsClockIn((prev) => {
            if (prev) {
                setAttendance({
                    email: user.email,
                    clockIn: new Date(),
                })
            } else {
                setAttendance(async (prev) => {
                    const docRef = await addLog(
                        {
                            ...prev,
                            clockOut: new Date(),
                        },
                        firebasePath
                    )

                    return {}
                })
            }

            return !prev
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1.5rem',
                            margin: '1rem 0',
                        }}
                    >
                        <DigitalClock ref={clockSnoozeButtonRef} />
                        <Button variant="contained" onClick={handleClockSnooze}>
                            {isClockIn ? 'Clock in' : 'Clock out'}
                        </Button>
                    </Box>

                    {attendance && Object.keys(attendance).length > 0 && (
                        <Box
                            sx={{
                                border: '5px solid #EDC9AF',
                                borderRadius: '7px',
                                padding: '1.25rem 1rem',
                                marginBottom: '1rem',
                            }}
                        >
                            {attendance.email && (
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: '.75rem',
                                            sm: '1.25rem',
                                        },
                                        marginBottom: '2px',
                                        color: 'black',
                                        fontWeight: '300',
                                    }}
                                >
                                    {attendance.email}
                                </Typography>
                            )}
                            {attendance.clockIn && (
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: '.75rem',
                                            sm: '1.25rem',
                                        },
                                        marginBottom: '2px',
                                        color: 'black',
                                        fontFamily: 'Orbitron, sans-serif',
                                    }}
                                >
                                    <b>Clock in:</b>{' '}
                                    {new Intl.DateTimeFormat(
                                        'en-US',
                                        dateTimeString
                                    ).format(attendance.clockIn)}
                                </Typography>
                            )}
                            {attendance.clockOut && (
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontSize: {
                                            xs: '.75rem',
                                            sm: '1.25rem',
                                        },
                                        marginBottom: '2px',
                                        color: 'black',
                                        fontFamily: 'Orbitron, sans-serif',
                                    }}
                                >
                                    <b>Clock out:</b>{' '}
                                    {new Intl.DateTimeFormat(
                                        'en-US',
                                        dateTimeString
                                    ).format(attendance.clockOut)}
                                </Typography>
                            )}
                        </Box>
                    )}
                    {logs && <Logs logs={logs} />}
                </Box>
            )}
        </>
    )
}

export default Home
