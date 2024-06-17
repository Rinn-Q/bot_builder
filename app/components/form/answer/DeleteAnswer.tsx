import * as React from 'react';
import Dialog from '@mui/material/Dialog';
interface DeleteAnswerProps {
  deleteHandler: Function,
}

export default function DeleteAnswer(props: DeleteAnswerProps) {
  const [open, setOpen] = React.useState(false);

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

  const clickDelete = () => {
    //-----uildel logicuud -----
    props.deleteHandler();
    setOpen(false)
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
        <div className='w-96 h-auto p-6'>
          <div className='mb-4'>
            {
              `Та итгэлтэй байна уу?`
            }
          </div>
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
              onClick={clickDelete}
              className='px-4 py-1 rounded-md font-sans text-white'
              style={{ backgroundColor: '#22C55E' }}
            >
              устгах
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}