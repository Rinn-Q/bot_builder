'use client'
import React , { useState , useEffect } from "react"
import Choice from "../choice/page"
import Answer from "../answer/page"

interface Choice {
    id: number,
    choice_content: string,
    parent_id: number
}

interface Answer {
    id: number,
    answer_content: string,
    choice_id: number
}
interface Choice {
    id: number,
    choice_content: string,
    parent_id: number
}

interface Answer {
    id: number,
    answer_content: string,
    choice_id: number
}

export default function Container() {
    const [ choice , setChoice ] = useState<Choice[]>([]);
    const [ answer , setAnswer ] = useState<Answer[]>([]);

    const fetchChoiceData = async () => {
        try {
            const res = await fetch(`https://176b-66-181-164-203.ngrok-free.app/api/choice`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                },
                method: "GET"
            });
            
            const choiceData : Choice[] = await res.json();
            setChoice(choiceData)
        } catch (error) {
            console.log(`Error fetching choice Data : ${error}`);
        }
    }

    const fetchAnswerData = async () => {
        try {
            const res = await fetch('https://176b-66-181-164-203.ngrok-free.app/api/answer', {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                },
                method: "GET"
            });
            const answerData : Answer[] = await res.json();
            setAnswer(answerData);
        } catch (error) {
            console.log(`Error fetching choice Data : ${error}`);
        }
    }

    useEffect (() => {
        fetchChoiceData();
        fetchAnswerData();
    }, [])

    return (
        <div className=" rounded-2xl shadow-md w-full h-5/6 p-2">
            <div className="rounded-xl shadow-md w-full h-52 mb-5 p-2 bg-slate-100">
                <Answer/>
            </div>
            <div className="rounded-xl w-full h-56 flex justify-between">
                <div className="shadow-md w-2/5 p-2 mr-2 bg-slate-200 rounded-xl">heloo</div>
                <div className="shadow-md w-3/5 p-2 bg-slate-100 rounded-xl">heloo</div>
            </div>
        </div>
    )
}