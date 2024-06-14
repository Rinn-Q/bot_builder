
"use client"

import react from "react";
import { useState } from "react";

import "./answer.css";

type typeAnswer = {
    width: number,
    height: number,
    caption: string,
    description: string
}

function handleEditBtn(){

}

export default function Answer({ width, caption, description }: typeAnswer) {

    const [editingCaption, setEditingCaption] = useState(false);

    return (
        <div className="container circle_edge" style={{ width: width }}>
            <div className="container-content circle_edge">
                {editingCaption === false ? <div className="editBtn" onClick={handleEditBtn}></div> : <input type="text" id="editCaption" name="editCaption"/>}
                <h1 className="caption_answer"><strong>{caption}</strong></h1>
                <br />
                <p className="description_answer">{description}</p>
            </div>
        </div>
    )
}