'use client';
import * as React from 'react';
import { Container, Typography, ListItem, List, Box, IconButton, ButtonBase } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomPopper from '../popper/page';
import { AddBox, Edit, Delete } from '@mui/icons-material';
import DeleteChoice from '../form/choice/DeleteChoice';
import EditChoice from '../form/choice/EditChoice';
import AddChoice from '../form/choice/AddChoice';

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
    onChoiceChange: Function;
};

export default function Choice({ width, height, info, onChoiceChange }: ParameterType) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState<ChoiceModel>();

    const [content, setChoiceContent] = React.useState(info.choice_content);

    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
    const [isAddOpen, setIsAddOpen] = React.useState(false);

    const handleEditOpen = () => {
        setIsEditOpen(true);
    }
    const handleEditClose = () => {
        setIsEditOpen(false);
    }
    const handleDeleteOpen = () => {
        setIsDeleteOpen(true);
    }
    const handleDeleteClose = () => {
        setIsDeleteOpen(false);
    }
    const handleAddOpen = () => {
        setIsAddOpen(true);
    }
    const handleAddClose = () => {
        setIsAddOpen(false);
    }
    const deleteHandler = () => {
    }
    const addHandler = (added: any) => {
        const choice = {
            id: 1234,
            choice_content: added.choice_content,
            parent_id: added.parent_id
        }
        console.log(`~~~~~~~~~~~~~${added.choice_content}`);
        info.children.push(choice);
        setData(info);
    }
    const editHandler = (content: string) => {
        setChoiceContent(content);
        info.choice_content = content;
    }
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
            // width: `${width}%`,
            height: `${height}%`,
            borderRadius: 4,
            bgcolor: '#F0FFF1',
            position: 'relative',
            padding: '2px',
            // maxWidth: `${width}`

        }}>
            <Box sx={{ padding: 2, maxHeight: '100%', overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' }, }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ flexGrow: 1, textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                        {info.choice_content}
                    </Typography>
                    <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleToggle}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        // width: '100%',
                        maxHeight: 'calc(100vh - 200px)',
                        overflowY: 'auto',
                    }}
                >
                    <List
                        sx={{
                            padding: 0,
                            width: '100%',
                            maxWidth: "100%",
                            position: 'relative',
                            overflowY: 'auto',
                            maxHeight: '100%',
                        }}
                    >
                        {data?.children.map((item, index) => (
                            <ListItem key={index} sx={{ padding: 0 }}>
                                <ButtonBase
                                    onClick={() => {
                                        onChoiceChange(item.id);
                                    }}
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
            <EditChoice
                id={info.id}
                open={isEditOpen}
                handleUpdate={editHandler}
                onClose={handleEditClose}
                choice_content={content} />
            <DeleteChoice
                deleteHandler={deleteHandler}
                onClose={handleDeleteClose}
                open={isDeleteOpen}
                id={info.id}
            />
            <AddChoice
                onClose={handleAddClose}
                open={isAddOpen}
                parent_id={info.id}
                addChoiceHandler={addHandler}
            />
            <CustomPopper
                open={open}
                anchorRef={anchorRef}
                handleClose={handleClose}
                buttonData={[
                    {
                        title: 'Нэмэх', icon: AddBox,
                        handlePopup: handleAddOpen
                    },
                    {
                        title: 'Засах', icon: Edit,
                        handlePopup: handleEditOpen
                    },
                    {
                        title: 'Устгах', icon: Delete,
                        handlePopup: handleDeleteOpen
                    },
                ]} />
        </Container>
    );
}
