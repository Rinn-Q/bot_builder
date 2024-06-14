
"use client"

import react from "react";
import { useState } from "react";

import "./answer.css";

type typeAnswer = {
    height: number,
    width: number,
    caption: string,
    description: string
}

export default function Answer({ width, caption, description , height}: typeAnswer) {

    const [currentCaption, setCurrentCaption] = useState(caption);
    const [currentDescription, setCurrentDescription] = useState(description);
    const [editingCaption, setEditingCaption] = useState(false);
    const [editingDescription, setEditingDescription] = useState(false);
    
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);

    function handleEditBtnClicked(){
        if(isEditBtnClicked) 
            setIsEditBtnClicked(false);
        else 
            setIsEditBtnClicked(true);
    }
    function handleEditCaption(){
        if(editingCaption) 
            setEditingCaption(false);
        else 
            setEditingCaption(true);
    }
    function handleEditDescription(){
        if(editingDescription) 
            setEditingDescription(false);
        else 
            setEditingDescription(true);
    }
    

    return (
        // <div className="container circle_edge" style={{ width: `${width}%` , height: `${height}%` }}>
            <div className="container-content circle_edge" style={{ width: `${width}%` , height: `${height}%` }}>
                <div className="editBtn" onMouseOver={() => setIsEditBtnClicked(true)}></div>
                
                {isEditBtnClicked &&  
                <div className="container_editContentBtns">
                    <button className="editContentBtns editCaptionBtn" onClick={handleEditCaption}>Гарчиг засах</button>
                    <br />
                    <div className="horizontal_line"></div>
                    <button className="editContentBtns editDescriptionBtn" onClick={handleEditDescription}>Тайлбар засах</button>
                </div>}

                {editingCaption === false ? 
                <h1 className="caption_answer"><strong>{currentCaption}</strong></h1>
                : <input 
                    type="text" 
                    id="editCaption" 
                    name="editCaption"
                    value={currentCaption}
                    onChange = {(e) => setCurrentCaption(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter")  setEditingCaption(false)
                    } }
                    className="circle_edge"
                    />}
                <br />
                {editingDescription === false ? <p className="description_answer">{currentDescription}</p> 
                :
                <input 
                type="text" 
                id="editDescription" 
                name="editDescription"
                value={currentDescription}
                onChange = {(e) => setCurrentDescription(e.target.value)}
                onKeyDown={(e) => {
                if(e.key === "Enter")  setEditingDescription(false)
                } }
                className="circle_edge"
                />}    
            </div>
        // </div>
    )
}
