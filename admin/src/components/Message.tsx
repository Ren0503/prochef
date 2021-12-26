import React, { FunctionComponent } from 'react'
import { Alert } from '@mui/material'

enum Variant {
    error = "error",
    success = "success",
    warning = "warning",
    info = "info"
}

interface MessageProps {
	children: React.ReactNode
	variant: Variant
}

const Message: FunctionComponent<MessageProps> = ({
    children,
    variant
}: MessageProps) => {
    return <Alert severity={variant}>{ children}</Alert>
}

export default Message
