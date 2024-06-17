'use client';
import * as React from 'react';
import { Container, Typography, ListItem, List, Box, IconButton, ButtonBase } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomPopper from '../popper/page';
import { AddBox, Edit, Delete } from '@mui/icons-material';

interface ChoiceModel {
    id: number;
    choice_content: string;
    parent_id: number;
    children: Array<{
        id: number;
        choice_content: string;
        parent_id: number;
    }>;
}

type ParameterType = {
    height: number;
    width: number;
    info: ChoiceModel;
};

export default function Choice({ width, height, info }: ParameterType) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<ChoiceModel>();

    React.useEffect(() => {
        setData(info);
    }, [info]);

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
            width: `${width}%`,
            height: `${height}%`,
            borderRadius: 4,
            bgcolor: '#F0FFF1',
            position: 'relative',
            padding: '4px',
        }}>
            <Box sx={{ padding: 2, maxHeight: '100%', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ flexGrow: 1, textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                    >
                        {info.choice_content}
                    </Typography>
                    <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleToggle}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: 'calc(100vh - 100px)',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    <List
                        sx={{
                            padding: 0,
                            width: '100%',
                            maxWidth: "100%",
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: "100%",
                        }}
                    >
                        {data?.children.map((item, index) => (
                            <ListItem key={index} sx={{ padding: 0 }}>
                                <ButtonBase
                                    onClick={() => {}}
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: '#FFFFFF',
                                        width: '100%',
                                        height: 50,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        padding: '0 16px',
                                        my: 1,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                        {item.choice_content}
                                    </Box>
                                </ButtonBase>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            <CustomPopper
                open={open}
                anchorRef={anchorRef}
                handleClose={handleClose}
                buttonData={[
                    {
                        title: 'Нэмэх', icon: AddBox,
                        handlePopup: function (): void {
                            throw new Error('Function not implemented.');
                        }
                    },
                    {
                        title: 'Засах', icon: Edit,
                        handlePopup: function (): void {
                            throw new Error('Function not implemented.');
                        }
                    },
                    {
                        title: 'Устгах', icon: Delete,
                        handlePopup: function (): void {
                            throw new Error('Function not implemented.');
                        }
                    },
                ]}/>
        </Container>
    );
}
