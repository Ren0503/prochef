import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { 
    Box,
    Container,
    createTheme,
    CssBaseline,
    Typography,
} from '@mui/material'
import { ThemeProvider } from '@mui/private-theming';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link to="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme()

const AuthLayout:FunctionComponent = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {children}
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}

export default AuthLayout
