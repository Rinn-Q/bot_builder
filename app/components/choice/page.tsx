'use client'
import * as React from 'react';
import { Container, Typography, ListItem, List, Box, IconButton, ButtonBase } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomPopper from '../popper/page';
import {AddBox,Edit,Delete } from '@mui/icons-material';

interface ChoiceModel {
    id: number,
    choice_content: string,
    parent_id: number,
    children: Array<{
        id: number,
        choice_content: string,
        parent_id: number
    }>
}

type parameterType = {
    height: number,
    width: number,
    info : ChoiceModel
}

export default function Choice({ width, height , info}: parameterType) {
    const [open, setOpen] = React.useState(false);
    const [ data , setData ] = React.useState<ChoiceModel>();

    React.useEffect(() => {
        setData(info);
    }, []);

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

    return (
            <Container maxWidth="sm" sx={{
                width: {width},
                height: {height},
                borderRadius: 10,
                bgcolor: '#F0FFF1',
                position: 'relative'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h1" gutterBottom sx={{ flexGrow: 1, margin: '0 auto' }}>
                {data?.choice_content}
                </Typography>

                    <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleToggle}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Box sx={{ height: 250, overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
                    <List>
                        {data?.children.map((item, index) => (
                            <ListItem key={index}>
                                <ButtonBase
                                    onClick={() => console.log(`Hii ${item}`)}
                                    sx={{
                                        borderRadius: 10,
                                        bgcolor: '#FFFFFF',
                                        width: '84%',
                                        height: '15%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        padding: '0 16px',
                                    }}>
                                    <Box sx={{ className: 'truncated-text' }}>{item.choice_content}</Box>
                                </ButtonBase>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <CustomPopper open={open} anchorRef={anchorRef} handleClose={handleClose} buttonData={[{title:"Нэмэх",icon: AddBox},{title:"Засах",icon: Edit},{title:"Устгах",icon: Delete},]} />
            </Container>
    );
}
