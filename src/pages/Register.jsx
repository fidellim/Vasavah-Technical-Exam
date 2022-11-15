import { useFormik } from 'formik'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../library/firebaseConfig'
import { registerValidationSchema } from '../library/form'
import { Typography, Box, TextField, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate, Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { useSnackbar } from 'notistack'

const Register = () => {
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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const { email, password, confirmPassword } = values

            if (password !== confirmPassword) {
                enqueueSnackbar(`Password doesn't match. Please try again.`, {
                    action,
                    autoHideDuration: 3000,
                    variant: 'error',
                })
                return
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // const user = userCredential.user
                    resetForm({ values: '' })
                    signOut(auth)
                        .then(() => {
                            // Sign-out successful.
                            enqueueSnackbar('Register success!', {
                                action,
                                autoHideDuration: 3000,
                                variant: 'success',
                            })
                            navigate(`/login`)
                        })
                        .catch((error) => {
                            enqueueSnackbar(`There is a problem. Try again.`, {
                                action,
                                autoHideDuration: 3000,
                                variant: 'error',
                            })
                        })
                })
                .catch((error) => {
                    // const errorCode = error.code
                    // const errorMessage = error.message
                    enqueueSnackbar(`Register was unsuccessful.`, {
                        action,
                        autoHideDuration: 3000,
                        variant: 'error',
                    })
                })
        },
    })

    return (
        <Box
            sx={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#edf6f9',
                minHeight: '100vh',
            }}
        >
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
                    Create an account!
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
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                            }
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Register
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
                    <Link to="/login">
                        <Typography
                            variant="h4"
                            component="h4"
                            sx={{
                                fontSize: '14px',
                                textAlign: 'center',
                                padding: '6px 16px',
                            }}
                        >
                            Login
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Register
