
"use client"
import { useRef, useState } from "react";

// MUI
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from "@mui/material";

// Custom components
import CustomPopper from "../popper/page";

// Style
import "./answer.css";

type typeAnswer = {
    height: number,
    width: number,
    caption: string,
    description: string
};

export default function Answer({ width, height, caption, description }: typeAnswer) {
    const [currentCaption, setCurrentCaption] = useState(caption);
    const [currentDescription, setCurrentDescription] = useState(description);
    const [editingCaption, setEditingCaption] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);

    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

    const [openPopup, setOpenPopup] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    // Edit хийх(3 цэгтэй) товчийг toggle хийх функцууд
    const handleToggle = () => {
        setOpenPopup((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
            return;
        }
        setOpenPopup(false);
    };

    return (
        <div className="container-content circle_edge" style={{ width: `${width}%`, height: `${height}%` }}>
            <div className="container-holder">
                <div className="upper_container">
                    <h1 className="caption_answer">
                        <strong>
                            {/* {currentCaption} */}
                            Яаж төлбөрөө төлөх вэ?
                        </strong>
                    </h1>
                    <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleToggle}>
                        <MoreVertIcon />
                    </IconButton>
                    <CustomPopper open={openPopup} anchorRef={anchorRef} handleClose={handleClose} />
                </div>

                <div className="underside_container">
                    <p className="description_answer mb-4">
                        {/* {currentDescription} */}
                        Та дараах зааврын дагуу дугаарт цэнэглэлт хийх боломжтой.1. Та апп-н нүүр хэсэгт байрлах ДАНС ЦЭНЭГЛЭХ цэсээр орно.2. Нэгж эсвэл Багц сонгоно.3. Өөрийн боломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэцэнэглэлт хийх боломжтой.1. Та апп-н нүүр хэсэгт байрлах ДАНС ЦЭНЭГЛЭХ цэсээр орно.2. Нэгж эсвэл Багц сонгоно.3. Өөрийн боломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэцэнэглэлт хийх боломжтой.1. Та апп-н нүүр хэсэгт байрлах ДАНС ЦЭНЭГЛЭХ цэсээр орно.2. Нэгж эсвэл Багц сонгоно.3. Өөрийн боломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэ.оломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэцэнэглэлт хийх боломжтой.1. Та апп-н нүүр хэсэгт байрлах ДАНС ЦЭНЭГЛЭХ цэсээр орно.2. Нэгж эсвэл Багц сонгоно.3. Өөрийн боломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэ.1. Та апп-н нүүр хэсэгт байрлах ДАНС ЦЭНЭГЛЭХ цэсээр орно.2. Нэгж эсвэл Багц сонгоно.3. Өөрийн боломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэцэнэглэлт хийх боломжтой.1. Та апп-н нүүр хэсэгт байрлах ДАНС ЦЭНЭГЛЭХ цэсээр орно.2. Нэгж эсвэл Багц сонгоно.3. Өөрийн боломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэ.оломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэцэнэглэлт хийх боломжтой.1. Та апп-н нүүр хэсэгт байрлах ДАНС ЦЭНЭГЛЭХ цэсээр орно.2. Нэгж эсвэл Багц сонгоно.3. Өөрийн боломжтой төлбөрийн хэрэгсэлээ сонгоод гүйлгээ хийнэ.
                    </p>
                </div>
            </div>
        </div>
    )
}