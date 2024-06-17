import * as React from 'react';
import Dialog from '@mui/material/Dialog';
interface EditChoiceProps {
  open: boolean,
  id: number,
  choice_content: string,
  handleUpdate: Function
}

export default function EditChoice(props: EditChoiceProps) {
  const [open, setOpen] = React.useState(props.open);
  const [choice_content, setChoiceContent] = React.useState(props.choice_content)

  React.useEffect(() => {
    setChoiceContent(choice_content);
  }, [choice_content]);

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
    editBD();
    props.handleUpdate(choice_content);
    setOpen(false)
  }

  const editBD = async() => {
    try {
        const updatedChoiceContent = await fetch(`https://8476-66-181-164-203.ngrok-free.app/api/choice/${props.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
              choice_content: choice_content,
            })
          })

          console.log("Updated choice content:::::" + updatedChoiceContent);
    } catch(error) {
        console.log(error)
    }
  }
  return (
    <div>
      {/* <button
        type="button"
        onClick={handleClickOpen}
        className='border border-gray-500  px-4 py-1 rounded-md'
      >
        button
      </button> */}
      <Dialog open={open} onClose={handleClose}>
        <div className='w-96 h-auto p-6'>
          <p className='font-mono'>өөрчлөх утгаа оруулна уу</p>
          <input
            type="text"
            value={choice_content}
            onChange={(e) => setChoiceContent(e.target.value)}
            className={`p-2 mb-3 rounded-xl border-slate-300 font-mono font-semibold w-full ${choice_content ? 'border-green-400' : ''}`}
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