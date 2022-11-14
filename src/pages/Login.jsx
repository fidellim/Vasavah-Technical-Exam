import { useFormik } from 'formik'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../library/firebaseConfig'
import { loginValidationSchema } from '../library/form'
import { Typography, Box, TextField, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const Login = () => {
    let navigate = useNavigate()
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
                navigate(`/`)
            } else {
                // User is signed out
                navigate(`/login`)
            }
        })

        return () => unsubscribe()
    }, [navigate])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const { email, password } = values
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // const user = userCredential.user
                    enqueueSnackbar('Login successful!', {
                        action,
                        autoHideDuration: 3000,
                        variant: 'success',
                    })
                    resetForm({ values: '' })
                })
                .catch((error) => {
                    // const errorCode = error.code
                    // const errorMessage = error.message
                    enqueueSnackbar('Unable to login. Try again!', {
                        action,
                        autoHideDuration: 3000,
                        variant: 'error',
                    })
                })
        },
    })

    return (
        <Box sx={{ padding: '1rem' }}>
            <Box
                sx={{
                    background: 'white',
                    borderRadius: '7px',
                    padding: '1rem',

                    width: {
                        xs: '100%',
                        sm: '450px',
                    },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: {
                            xs: '1.5rem',
                            sm: '2rem',
                        },
                        textAlign: 'center',
                        marginBottom: '5px',
                        color: '#000058',
                    }}
                >
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            type="text"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Login
                        </Button>
                    </Box>
                </form>
                <Box
                    sx={{
                        border: '2px solid lightBlue',
                        margin: '1rem 0',
                        borderRadius: '7px',
                        textTransform: 'uppercase',
                    }}
                >
                    <Link to="/register">
                        <Typography
                            variant="h4"
                            component="h4"
                            sx={{
                                fontSize: '14px',
                                textAlign: 'center',
                                padding: '6px 16px',
                            }}
                        >
                            Register
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Login
