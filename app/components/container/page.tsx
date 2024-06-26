"use client";
import React, { useState, useEffect } from "react";
import Choice from "../choice/page";
import Choice2 from "../choice_2/page";
import Answer from "../answer/page";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import AddChoice from "../form/choice/AddChoice";
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

  const [counter, setCounter] = useState(0);

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

  console.log("answer:", answer);
  const fetchChoiceData = async () => {
    try {
      const res = await fetch(
        `https://f900-66-181-164-203.ngrok-free.app/api/choice/parent/1`,
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
        `https://f900-66-181-164-203.ngrok-free.app/api/choice/${id}`,
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
        `https://f900-66-181-164-203.ngrok-free.app/api/answer/${id}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          method: "GET",
        }
      );
      const choiceres = await fetch(
        `https://f900-66-181-164-203.ngrok-free.app/api/choice/${id}`,
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
  const addHandler = (added: any) => {
    const data = {
      id: 3,
      choice_content: added.choice_content,
      parent_id: added.parent_id,
      children: [],
    };
    firstChoice.push(data);
    setFirstChoice(firstChoice);
    setCounter(1);
  };

  useEffect(() => {
    fetchLastChoice(id);
    fetchAnswerData(id2);
  }, [id, id2]);

  useEffect(() => {
    fetchChoiceData();
  }, [counter]);

  return (
    <div className="w-full h-full bg-slate-100">
      <div
        className="rounded-xl box-shadow w-full mb-5 p-8 bg-white"
        style={{ justifyContent: "flex-start" }}
      >
        <div className="flex justify-between">
          <p className="font-bold text-2xl pb-4 h-1/2">Сонголтууд</p>
          <div style={{ height: "40px", marginBottom: "20px" }}>
            <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleAddOpen}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-5">
          {firstChoice ? (
            firstChoice.map((item) => (
              <Choice
                key={item.id}
                width={32}
                onChoiceChange={handleIdChange}
                info={item}
                height={100}
                handleDeleteChange={fetchChoiceData}
              />
            ))
          ) : (
            <ChoiceSkelton />
          )}
        </div>
      </div>
      <div className="rounded-xl w-full h-2/5 flex justify-between">
        <div className="box-shadow w-2/5 p-8 mr-10 rounded-xl bg-white">
          <p className="font-bold text-2xl pb-4 pl-3">Доторх сонголтууд</p>
          {lastChoice ? (
            lastChoice.map((item) => (
              <Choice2
                key={item.id}
                width={100}
                onChoiceChange={handleIdChange2}
                info={item}
                height={80}
              />
            ))
          ) : (
            <ChoiceSkelton />
          )}
        </div>
        <div className="box-shadow w-3/5 p-8 rounded-xl bg-white">
          <p className="font-bold text-2xl pb-4 ">Хариулт</p>
          {answer ? (
            <Answer
              handleDeleteChange={() => fetchLastChoice(id)}
              width={100}
              caption={answer.choice_content}
              description={answer.answer_content}
              height={80}
              id={answer.id}
              choice_id={id2}
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
