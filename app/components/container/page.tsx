"use client";
import React, { useState, useEffect } from "react";
import Choice from "../choice/page";
import Choice2 from "../choice_2/page";
import Answer from "../answer/page";
import CustomPopper from "../popper/page";
import { AddBox, Edit, Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
    Typography,
    ListItem,
    List,
    Box,
    IconButton,
    ButtonBase,
} from "@mui/material";
import AddChoice from "../form/choice/AddChoice";
import EditChoice from "../form/choice/EditChoice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AnswerSkelton from "../skelton/AnswerSkelton";
import ChoiceSkelton from "../skelton/ChoiceSkelton";

interface Choices {
    id: number;
    choice_content: string;
    parent_id: number;
    children: Array<{
        id: number;
        choice_content: string;
        parent_id: number;
    }>;
}

interface Answer {
    id: number;
    answer_content: string;
    choice_content: string;
    choice_id: number;
}

export default function Container() {
    const [firstChoice, setFirstChoice] = useState<Choices[]>([]);
    const [lastChoice, setlastChoice] = useState<Choices[]>([]);
    const [answer, setAnswer] = useState<Answer>();
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const handleAddOpen = () => {
        setIsAddOpen(true);
    };
    const handleAddClose = () => {
        setIsAddOpen(false);
    };

    const [id, setID] = useState<number>(0);
    const [id2, setID2] = useState<number>(0);
    const handleIdChange = (value: number) => {
        setID(value);
    };
    const handleIdChange2 = (value: number) => {
        setID2(value);
    };

    const fetchChoiceData = async () => {
        try {
            const res = await fetch(
                `https://ebdd-66-181-164-203.ngrok-free.app/api/choice/parent/1`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                    method: "GET",
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data: { choicesWithChildren: Choices[] } = await res.json();
            setFirstChoice(data.choicesWithChildren);
        } catch (error) {
            console.log(`Error fetching choice data: ${error}`);
        }
    };

    const fetchLastChoice = async (id: number) => {
        try {
            const res = await fetch(
                `https://ebdd-66-181-164-203.ngrok-free.app/api/choice/${id}`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                    method: "GET",
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data: { choicesWithChildren: Choices[] } = await res.json();
            setlastChoice(data.choicesWithChildren);
        } catch (error) {
            console.log(`Error fetching choice data: ${error}`);
        }
    };

    const fetchAnswerData = async (id: number) => {
        try {
            const res = await fetch(
                `https://ebdd-66-181-164-203.ngrok-free.app/api/answer/${id}`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                    method: "GET",
                }
            );
            const choiceres = await fetch(
                `https://ebdd-66-181-164-203.ngrok-free.app/api/choice/${id}`,
                {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                    method: "GET",
                }
            );
            const answerData = await res.json();
            const choiceData = await choiceres.json();
            const contentData: Answer = {
                id: answerData.id,
                answer_content: answerData.answer_content,
                choice_content: choiceData.choicesWithChildren[0].choice_content,
                choice_id: answerData.choice_id,
            };
            setAnswer(contentData);
        } catch (error) {
            console.log(`Error fetching choice Data : ${error}`);
        }
    };
    const addHandler = async () => { };

    useEffect(() => {
        fetchChoiceData();
        fetchLastChoice(id);
        fetchAnswerData(id2);
    }, [id, id2, answer]);

    return (
        <div className="w-full h-full bg-slate-100">
            <div
                className="rounded-xl box-shadow w-full h-1/2 mb-5 p-8 bg-white flex overflow-x-auto gap-5"
                style={{ justifyContent: "flex-start" }}
            >
                {firstChoice ? (
                    firstChoice.map((item) => (
                        <Choice
                            key={item.id}
                            width={32}
                            onChoiceChange={handleIdChange}
                            info={item}
                            height={100}
                        />
                    ))
                ) : (
                    <ChoiceSkelton />
                )}
                <div style={{ height: "40px", marginTop: "20px" }}>
                    <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleAddOpen}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div className="rounded-xl w-full h-2/5 flex justify-between">
                <div className="box-shadow w-2/5 p-8 mr-10 rounded-xl bg-white">
                    {lastChoice ? (
                        lastChoice.map((item) => (
                            <Choice2
                                key={item.id}
                                width={100}
                                onChoiceChange={handleIdChange2}
                                info={item}
                                height={100}
                            />
                        ))
                    ) : (
                        <ChoiceSkelton />
                    )}
                </div>
                <div className="box-shadow w-3/5 p-8 rounded-xl bg-white">
                    {answer ? (
                        <Answer
                            width={100}
                            caption={answer.choice_content}
                            description={answer.answer_content}
                            height={100}
                            id={answer.id}
                            choice_id={answer.choice_id}
                        />
                    ) : (
                        <AnswerSkelton />
                    )}
                </div>
            </div>
            <AddChoice
                onClose={handleAddClose}
                open={isAddOpen}
                parent_id={1}
                addChoiceHandler={addHandler}
            />
        </div>
    );
}
