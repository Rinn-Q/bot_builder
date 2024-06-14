'use client'
import React, { useState, useEffect } from "react"
import Choice from "../choice/page"
import Answer from "../answer/page"
import './container.css'
import EditAnswer from '../form/answer/EditAnswer'

interface Choices {
    id: number,
    choice_content: string,
    parent_id: number,
    children: Array<{
        id: number,
        choice_content: string,
        parent_id: number
    }>
}

interface Answer {
    id: number,
    answer_content: string,
    choice_id: number
}

export default function Container() {
    const [firstChoice, setFirstChoice] = useState<Choices[]>([]);
    const [lastChoice, setlastChoice] = useState<Choices[]>([]);
    const [choice, setChoice] = useState<Choices[]>([]);
    const [answer, setAnswer] = useState<Answer>();

    // const [firstChoice, setChoicesWithChildren] = useState<Choice[]>([]);

    const fetchChoiceData = async () => {
        try {
            const res = await fetch(`https://5eb1-66-181-164-203.ngrok-free.app/api/choice/7`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                },
                method: "GET"
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data: { choicesWithChildren: Choices[] } = await res.json();
            setFirstChoice(data.choicesWithChildren);
        } catch (error) {
            console.log(`Error fetching choice data: ${error}`);
        }
    }

    console.log(firstChoice)

    const fetchAnswerData = async (id: number) => {
        try {
            const res = await fetch(`https://176b-66-181-164-203.ngrok-free.app/api/answer${id}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                },
                method: "GET"
            });
            const answerData: Answer = await res.json();
            setAnswer(answerData);
        } catch (error) {
            console.log(`Error fetching choice Data : ${error}`);
        }
    }

    useEffect(() => {
        fetchChoiceData();
        fetchAnswerData(61);
    }, [])

    return (
        <div className="w-full h-full">
            <div className="rounded-xl box-shadow w-full h-1/2 mb-5 p-8 flex justify-between">
                {firstChoice.map((item) => (
                    <Choice key={item.id} width={400} info={item} height={350} />
                ))}
            </div>
            <div className="rounded-xl w-full h-2/5 flex justify-between">
                <div className="box-shadow w-2/5 p-8 mr-10 rounded-xl">
                    {/* <Answer width={100} caption="heloo" description="hi" height={100}/> */}
                </div>
                <div className="box-shadow w-3/5 p-8 rounded-xl">
                    {
                        answer ? (
                            <Answer width={100} caption="" description={answer.answer_content} height={100} />
                        ) : (
                            <Answer width={100} caption="" description="Хариулт олдсонгүй" height={100} />
                        )
                    }
                </div>
            </div>
            {/* <EditAnswer answer="sadf" choice="sadfgh"/> */}
        </div>
    )
}