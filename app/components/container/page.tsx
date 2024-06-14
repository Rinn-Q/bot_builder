'use client'
import React , { useState , useEffect } from "react"
import Choice from "../choice/page"
import Answer from "../answer/page"
import './container.css'

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
        <div className="w-full h-full">
            <div className="rounded-xl box-shadow w-full h-1/2 mb-5 p-8 flex justify-between">
              {[...Array(5)].map((_, index) => (
                <Answer key={index} width={18} caption="hello" description="hi" height={100} />
              ))}
            </div>
            <div className="rounded-xl w-full h-2/5 flex justify-between">
                <div className="box-shadow w-2/5 p-8 mr-10 rounded-xl">
                    <Answer width={100} caption="heloo" description="hi" height={100}/>
                </div>
                <div className="box-shadow w-3/5 p-8 rounded-xl">
                    <Answer width={100} caption="heloo" description="hi" height={100}/>
                </div>
            </div>
        </div>
    )
}