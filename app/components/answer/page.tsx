"use client"
import { useEffect, useRef, useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import CustomPopper from "../popper/page";
import "./answer.css";
import EditAnswer from "../form/answer/EditAnswer";
import DeleteAnswer from "../form/answer/DeleteAnswer";

type typeAnswer = {
    id: number,
    choice_id: number,
    height: number,
    width: number,
    caption: string,
    description: string,
};

export default function Answer({ id, choice_id, width, height, caption, description }: typeAnswer) {
    const [currentCaption, setCurrentCaption] = useState(caption);
    const [currentDescription, setCurrentDescription] = useState(description);

    const [isEditAnswerOpen, setIsEditAnswerOpen] = useState(false);
    const [isDeleteAnswerOpen, setIsDeleteAnswerOpen] = useState(false);

    const [openPopup, setOpenPopup] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setCurrentCaption(caption)
        setCurrentDescription(description);
    }, [caption, description]);

    const handleToggle = () => {
        setOpenPopup((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
            return;
        }
        setOpenPopup(false);
    };

    // - Edit

    const handleEditOpen = () => {
        setIsEditAnswerOpen(true);
    }

    const handleEditClose = () => {
        setIsEditAnswerOpen(false);
    }

    const handleUpdate = (caption: string, description: string) => {
        setCurrentCaption(caption);
        setCurrentDescription(description);
    }

    // - Delete

    const handleDeleteOpen = () => {
        setIsDeleteAnswerOpen(true);
    }

    const handleDeleteClose = () => {
        setIsDeleteAnswerOpen(false);
    }

    const deleteHandler = () => {
        // setCurrentCaption("");
        setCurrentDescription("");
    }
    return (
        <>
            <EditAnswer
                id={id}
                choice_id={choice_id}
                choice={currentCaption}
                answer={currentDescription}
                open={isEditAnswerOpen}
                handleUpdate={handleUpdate}
                onClose={handleEditClose}
            />
            <DeleteAnswer
                deleteHandler={deleteHandler}
                onClose={handleDeleteClose}
                open={isDeleteAnswerOpen}
                id={id}
            />
            <div className="container-content circle_edge" style={{ width: `${width}%`, height: `${height}%` }}>
                <div className="container-holder">
                    <div className="upper_container">
                        <h1 className="caption_answer">
                            <strong>{currentCaption}</strong>
                        </h1>
                        <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleToggle}>
                            <MoreVertIcon />
                        </IconButton>
                        <CustomPopper
                            open={openPopup}
                            anchorRef={anchorRef}
                            handleClose={handleClose}
                            buttonData={[
                                { title: "Засах", icon: Edit, handlePopup: handleEditOpen },
                                { title: "Устгах", icon: Delete, handlePopup: handleDeleteOpen }
                            ]}
                        />
                    </div>
                    <div className="underside_container">
                        <p className="description_answer mb-4">{currentDescription}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
