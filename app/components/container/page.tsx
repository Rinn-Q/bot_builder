'use client'
import React, { useState, useEffect } from "react"
import Choice from "../choice/page"
import Answer from "../answer/page"
import './container.css'
import AnswerSkelton from "../skelton/AnswerSkelton"
import ChoiceSkelton from "../skelton/ChoiceSkelton"

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
    const [lastChoice, setlastChoice] = useState<Choices>();
    const [answer, setAnswer] = useState<Answer>();

    const fetchChoiceData = async () => {
        try {
            const res = await fetch(`https://8476-66-181-164-203.ngrok-free.app/api/choice/1`, {
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

    const fetchLastChoice = async (id: number) => {
        try {
            const res = await fetch(`https://8476-66-181-164-203.ngrok-free.app/api/answer/${id}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                },
                method: "GET",
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data: { choicesWithChildren: Choices } = await res.json();
            setlastChoice(data.choicesWithChildren);
        } catch (error) {
            console.log(`Error fetching choice data: ${error}`);
        }
    }


    const fetchAnswerData = async (id: number) => {
        try {
            const res = await fetch(`https://8476-66-181-164-203.ngrok-free.app/api/answer/${id}`, {
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
        <div className="w-full h-full bg-slate-100">
            <div className="rounded-xl box-shadow w-full h-1/2 mb-5 p-8 flex justify-between bg-white">
                {
                    firstChoice ? (
                        firstChoice.map((item) => (
                            <Choice key={item.id} width={18} info={item} height={100} onChoiceChange={} />
                        ))
                    ) : (
                        <ChoiceSkelton />
                        // <div>
                        //   {Array(5).map((_, index) => (
                        //     <ChoiceSkelton key={index} />
                        //   ))}
                        // </div>
                    )
                }
            </div>
            <div className="rounded-xl w-full h-2/5 flex justify-between">
                <div className="box-shadow w-2/5 p-8 mr-10 rounded-xl bg-white">
                    <Answer width={100} caption="heloo" description="hi" height={100} id={0} choice_id={0} />
                </div>
                <div className="box-shadow w-3/5 p-8 rounded-xl bg-white">
                    {
                        answer !== undefined ? (
                            <Answer width={100} caption="" description={answer.answer_content} height={100} id={0} choice_id={0} />
                        ) : (
                            <AnswerSkelton />
                        )
                    }
                </div>
            </div>
        </div>
    )
}