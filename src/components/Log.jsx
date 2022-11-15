import { Typography, Box } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteLog } from '../database'

const Log = ({ log, firebasePath }) => {
    const { id, email, clockIn, clockOut } = log
    const dateTimeString = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    }

    const handleDeleteTodo = async () => {
        await deleteLog(id, firebasePath)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '5px solid #36454F',
                borderRadius: '7px',
                padding: '1.25rem 1rem',
            }}
        >
            <Box>
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
                    {email}
                </Typography>
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
                    {new Intl.DateTimeFormat('en-US', dateTimeString).format(
                        clockIn.toDate()
                    )}
                </Typography>
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
                    {new Intl.DateTimeFormat('en-US', dateTimeString).format(
                        clockOut.toDate()
                    )}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
                <DeleteIcon
                    onClick={handleDeleteTodo}
                    sx={{ cursor: 'pointer' }}
                />
            </Box>
        </Box>
    )
}

export default Log
