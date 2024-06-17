import * as React from 'react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import Dialog from '@mui/material/Dialog';
interface EditAnswerProps {
  id: number,
  choice_id: number,
  choice: string,
  answer: string,
  handleUpdate: Function
}

export default function EditAnswer(props: EditAnswerProps) {
  const [open, setOpen] = React.useState(false);
  const [answerValue, setAnswerValue] = React.useState(props.answer)
  const [choiceValue, setChoiceValue] = React.useState(props.choice)

  // -----------------------------------------------DIALOG handlers----------------------------------------------------------
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  // -----------------------------------------------BUTTON handlers----------------------------------------------------------
  const clickCancel = () => {

    setOpen(false)
  }

  const clickSave = () => {
    //-----uildel logicuud -----
    updateDB();
    props.handleUpdate(answerValue , choiceValue);
    setOpen(false);
  }

  const updateDB = async () => {
    //-----uildel logicuud -----
    try {
      const updatedAnswerContent = await fetch(`https://8476-66-181-164-203.ngrok-free.app/api/answer/${props.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          answer_content: answerValue,
        })
      })
  
      const updatedChoiceContent = await fetch(`https://8476-66-181-164-203.ngrok-free.app/api/choice/${props.choice_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          choice_content: choiceValue,
        })
      })
      console.log("Answer content :::::"+updatedChoiceContent + "\n" + "Choice content :::::" + updatedAnswerContent)
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={handleClickOpen}
        className='border border-gray-500  px-4 py-1 rounded-md'
      >
        button
      </button>
      <Dialog open={open} onClose={handleClose}>
        <div className='w-96 h-64 p-6'>
          <p className='font-mono'>Сонголт</p>
          <input
            type="text"
            value={choiceValue}
            onChange={(e) => setChoiceValue(e.target.value)}
            className={`p-2 mb-3 rounded-xl border-slate-300 font-mono font-semibold w-full ${choiceValue ? 'border-green-400' : ''}`}
          />
          <p className='font-mono'>Хариулт</p>
          <textarea
            value={answerValue}
            onChange={(e) => setAnswerValue(e.target.value)}
            className={`p-2 mb-3 rounded-xl border border-slate-300 font-sans w-full ${choiceValue ? 'border-green-400' : ''}`}
          />
          <div className='flex justify-around'>
            <button
              type="button"
              onClick={clickCancel}
              className='px-4 py-1 rounded-md font-sans text-white'
              style={{ backgroundColor: '#FF5630' }}
            >
              буцах
            </button>
            <button
              type="button"
              onClick={clickSave}
              className='px-4 py-1 rounded-md font-sans text-white'
              style={{ backgroundColor: '#22C55E' }}
            >
              өөрчлөх
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}