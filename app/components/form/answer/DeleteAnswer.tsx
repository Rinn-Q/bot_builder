import * as React from 'react';
import Dialog from '@mui/material/Dialog';
interface DeleteAnswerProps {
  id: number,
  open: boolean,
  deleteHandler: Function,
  onClose: () => void;
}

export default function DeleteAnswer(props: DeleteAnswerProps) {
  const [open, setOpen] = React.useState(props.open);

  React.useEffect(() => {
    setOpen(props.open);

    console.log("state:", open);
  }, [props.open]);


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
    deleteDB();
    props.deleteHandler();
    setOpen(false)
  }

  const deleteDB = async () => {
    //-----uildel logicuud -----
    try {
      const deletedData = fetch(`https://8476-66-181-164-203.ngrok-free.app/api/answer/${props.id}`, {
        method: 'DELETE',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      console.log("deleted data ::::::" + deletedData)
    } catch (error) {
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
      <Dialog open={open} onClose={props.onClose}>
        <div className='w-96 h-auto p-6'>
          <div className='mb-4'>
            {
              `Та итгэлтэй байна уу?`
            }
          </div>
          <div className='flex justify-around'>
            <button
              type="button"
              onClick={props.onClose}
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