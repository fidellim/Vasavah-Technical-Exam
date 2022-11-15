import { Typography, Box } from '@mui/material'
import React from 'react'
import Log from './Log'

const Logs = ({ logs }) => {
    return (
        <Box>
            <Typography
                variant="h2"
                sx={{
                    fontSize: {
                        xs: '1.5rem',
                        sm: '2rem',
                    },
                    marginBottom: '.75rem',
                    color: 'black',
                }}
            >
                {`Log${logs.length > 1 && 's'}`}
            </Typography>
            <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}
            >
                {logs.map((log) => (
                    <Log key={log.id} log={log} />
                ))}
            </Box>
        </Box>
    )
}

export default Logs
