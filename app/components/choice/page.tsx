'use client'
import * as React from 'react';
import { Container, Typography, ListItem, List, Box, IconButton, ButtonBase } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomPopper from '../popper/page';

export default function Choice() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current?.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9'];

    const json = {
        "id": 11,
        "choice_content": "Төлбөр төлөх",
        "parent_id": 7,
        "children": [
        {
        "id": 14,
        "choice_content": "Яаж төлбөрөө төлөх вэ?",
        "parent_id": 11
        },
        {
        "id": 15,
        "choice_content": "Бусдаар дансаа яаж цэнэглүүлэх вэ?",
        "parent_id": 11
        },
        {
        "id": 16,
        "choice_content": "Үйлчилгээний хугацаагаа хэрхэн сунгах вэ?",
        "parent_id": 11
        }
        ]
    }

    return (
            <Container maxWidth="sm" sx={{
                width: 300,
                height: 350,
                borderRadius: 10,
                bgcolor: '#F0FFF1',
                position: 'relative'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ flexGrow: 1, textAlign: 'center' }}>
                        My List
                    </Typography>
                    <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleToggle}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Box sx={{ height: 250, overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                    <List>
                        {items.map((item, index) => (
                            <ListItem key={index}>
                                <ButtonBase
                                    onClick={() => console.log(`Clicked on ${item}`)}
                                    sx={{
                                        borderRadius: 10,
                                        bgcolor: '#FFFFFF',
                                        width: '100%',
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        padding: '0 16px',
                                    }}
                                >
                                    <Box>{item}</Box>
                                </ButtonBase>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <CustomPopper open={open} anchorRef={anchorRef} handleClose={handleClose} />
            </Container>
    );
}
