import * as React from 'react';
import Dialog from '@mui/material/Dialog';
interface AddChoiceProps {
  open: boolean,
  parent_id: number,
  addChoiceHandler: Function,
}

export default function AddChoice(props: AddChoiceProps) {
  const [open, setOpen] = React.useState(props.open);
  const [choice_content , setChoiceContent] = React.useState('')

  React.useEffect(() => {
    setChoiceContent(choice_content);
  }, [choice_content]);

  // -----------------------------------------------DIALOG handlers----------------------------------------------------------
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // -----------------------------------------------BUTTON handlers----------------------------------------------------------
  const clickCancel = () => {
    setOpen(false)
  }

  const clickAdd = () => {
    //-----uildel logicuud -----
    addDB();
    props.addChoiceHandler();
    setOpen(false)
  }

  const addDB = async() => {
    //-----uildel logicuud -----
    try {
      const addedData = fetch(`https://8476-66-181-164-203.ngrok-free.app/api/choice`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
            parent_id: props.parent_id,
            choice_content: choice_content
        })
      })
      console.log("added data ::::::" + addedData)
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div className='w-96 h-auto p-6'>
            <p className='font-mono'>Сонголтоо оруулна уу</p>
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
              onClick={clickAdd}
              className='px-4 py-1 rounded-md font-sans text-white'
              style={{ backgroundColor: '#22C55E' }}
            >
              нэмэх
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}