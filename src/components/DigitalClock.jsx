import Clock from 'react-clock'
import { useState, useEffect, forwardRef } from 'react'
import { Typography, Box } from '@mui/material'

const DigitalClock = forwardRef((props, ref) => {
    const [value, setValue] = useState(new Date())

    const dateString = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }
    const timeString = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    }

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'fit-content',
                }}
            >
                <Box
                    sx={{
                        width: '50%',
                        height: '15px',
                        backgroundColor: 'black',
                        borderTopLeftRadius: '20px',
                        borderTopRightRadius: '20px',
                    }}
                    ref={ref}
                />
                <Box
                    sx={{
                        borderRadius: '12px',
                        padding: '1rem',
                        backgroundColor: '#EDC9AF',
                        zIndex: '1',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1.5rem',
                            borderRadius: '8px',
                            padding: '1.25rem 1rem',
                            backgroundColor: '#36454F',
                            overflow: 'hidden',
                        }}
                    >
                        <Clock value={value} className="clock" />
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: {
                                        xs: '1.5rem',
                                        sm: '2rem',
                                    },
                                    textAlign: 'center',
                                    marginBottom: '2px',
                                    color: 'white',
                                    fontFamily: 'Orbitron, sans-serif',
                                }}
                            >
                                {new Intl.DateTimeFormat(
                                    'en-US',
                                    dateString
                                ).format(value)}
                            </Typography>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: {
                                        xs: '1.5rem',
                                        sm: '2rem',
                                    },
                                    textAlign: 'center',
                                    marginBottom: '2px',
                                    color: 'white',
                                    fontFamily: 'Orbitron, sans-serif',
                                }}
                            >
                                {new Intl.DateTimeFormat(
                                    'en-US',
                                    timeString
                                ).format(value)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '15px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 1.5rem',
                    }}
                >
                    <Box
                        sx={{
                            width: '12.5%',
                            height: '100%',
                            backgroundColor: 'black',
                            borderBottomLeftRadius: '7px',
                            borderBottomRightRadius: '7px',
                        }}
                    />
                    <Box
                        sx={{
                            width: '12.5%',
                            height: '100%',
                            backgroundColor: 'black',
                            borderBottomLeftRadius: '7px',
                            borderBottomRightRadius: '7px',
                        }}
                    />
                </Box>
            </Box>
        </>
    )
})

export default DigitalClock
