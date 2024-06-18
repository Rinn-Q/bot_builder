import * as React from 'react';
import Dialog from '@mui/material/Dialog';

interface EditChoiceProps {
  open: boolean,
  id: number,
  choice_content: string,
  handleUpdate: (content: string) => void,
  onClose: () => void
}

export default function EditChoice(props: EditChoiceProps) {
  const [open, setOpen] = React.useState(props.open);
  const [choice_content, setChoiceContent] = React.useState(props.choice_content);

  React.useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  React.useEffect(() => {
    setChoiceContent(choice_content);
  }, [choice_content]);
  // -----------------------------------DIALOG handlers---------------------------------------------------
  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };
  // -------------------------------------BUTTON handlers-----------------------------------------------------
  const clickCancel = () => {
    setOpen(false);
    props.onClose();
  }

  const clickSave = () => {
    editDB();
    props.handleUpdate(choice_content);
    props.onClose();
  }

  const editDB = async () => {
    try {
      const response = await fetch(`https://53be-66-181-164-203.ngrok-free.app/api/choice/${props.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          new_choice_content: choice_content,
        })
      });
      if (response.ok) {
        console.log("Updated choice content:", choice_content);
      } else {
        console.error("Failed to update choice content");
      }
    } catch (error) {
      console.error("Error updating choice content:", error);
    }
  }

  return (
    <div>
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
