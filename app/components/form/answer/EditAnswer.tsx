import * as React from "react";
import Dialog from "@mui/material/Dialog";

interface EditAnswerProps {
  id: number;
  open: boolean;
  choice_id: number;
  choice: string;
  answer: string;
  handleUpdate: (caption: string, description: string) => void;
  onClose: () => void;
}

export default function EditAnswer(props: EditAnswerProps) {
  const { open, choice, answer, onClose, handleUpdate } = props;
  const [answerId, setAnswerId] = React.useState(0);
  const [answerValue, setAnswerValue] = React.useState(answer);
  const [choiceValue, setChoiceValue] = React.useState(choice);

  console.log("Edit answer::")
  console.log(props.id, " shuu de ho ho ho ho");
  console.log(props.choice_id);

  // Update local state when props change
  React.useEffect(() => {
    setAnswerValue(answer);
    setChoiceValue(choice);
  }, [answer, choice]);

  React.useEffect(() => {
    setAnswerId(props.id);
  }, [props.id]);

  console.log(answerValue);

  // Handlers
  const handleSave = () => {
    // Logic to update DB
    updateDB();
    handleUpdate(choiceValue, answerValue);
    onClose();
  };

  const updateDB = async () => {

    try {
      const response = await fetch(
        `https://f900-66-181-164-203.ngrok-free.app/api/answer/${props.choice_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(response.status);

      if (response.status !== 404) {
        const updatedAnswerContent = await fetch(
          `https://f900-66-181-164-203.ngrok-free.app/api/answer/${props.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({
              new_answer_content: answerValue,
            }),
          }
        );
        const updatedChoiceContent = await fetch(
          `https://f900-66-181-164-203.ngrok-free.app/api/choice/${props.choice_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({
              new_choice_content: choiceValue,
            }),
          }
        );
        console.log(
          "Answer content :::::" +
          (await updatedChoiceContent.json()) +
          "\n" +
          "Choice content :::::" +
          (await updatedAnswerContent.json())
        );
      } else {
        const createAnswerContent = await fetch(
          `https://f900-66-181-164-203.ngrok-free.app/api/answer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({
              answer_content: answerValue,
              choice_id: props.choice_id,
            }),
          }
        );
        const updatedChoiceContent = await fetch(
          `https://f900-66-181-164-203.ngrok-free.app/api/choice/${props.choice_id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({
              new_choice_content: choiceValue,
            }),
          }
        );
        console.log(
          "Choice content :::::" +
          updatedChoiceContent.json() +
          "\n" +
          "Answer content :::::" +
          createAnswerContent.json()
        );
        console.log("Failed to update answer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="w-96 h-64 p-6">
        <p className="font-mono">Сонголт</p>
        <input
          type="text"
          value={choiceValue}
          onChange={(e) => setChoiceValue(e.target.value)}
          className={`p-2 mb-3 rounded-xl border-slate-300 font-mono font-semibold w-full ${choiceValue ? "border-green-400" : ""}`}
        />
        <p className="font-mono">Хариулт</p>
        <textarea
          value={answerValue}
          onChange={(e) => setAnswerValue(e.target.value)}
          className={`p-2 mb-3 rounded-xl border border-slate-300 font-sans w-full border-green-400`}
        />
        <div className="flex justify-around">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1 rounded-md font-sans text-white"
            style={{ backgroundColor: "#FF5630" }}
          >
            буцах
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-1 rounded-md font-sans text-white"
            style={{ backgroundColor: "#22C55E" }}
          >
            өөрчлөх
          </button>
        </div>
      </div>
    </Dialog>
  );
}
