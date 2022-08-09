import { useState } from 'react';
import Modal from 'react-modal';

const ModalWindow = ({ deleteJob, id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const style = {
    overlay: {
      position: 'fixed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    content: {
      position: 'static',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '16px',
      outline: 'none',
      padding: '20px',
    },
  };

  return (
    <div>
      <button
        className="rounded-full bg-red-400 hover:bg-red-500 px-4 py-2 text-white font-medium "
        onClick={() => setModalIsOpen(!modalIsOpen)}
      >
        Remove
      </button>
      <Modal
        style={style}
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <p className="mb-3">Delete Job ?</p>
        <div className="flex gap-10">
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
          <button
            className="text-red-600 font-medium"
            onClick={() => {
              deleteJob(id);
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalWindow;
