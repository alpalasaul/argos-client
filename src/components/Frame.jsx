import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Moto from './../assets/Modelos-de-moto.png'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Frame = ({ frame }) => {

  const [src, setSrc] = useState("")

  const { id, createdTime, name } = frame

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setSrc(`https://drive.google.com/file/d/${id}/preview`)
  }, [])

  const formatDate = (createdTime) => {
    return createdTime.split('T')[0]
  }

  const showModal = (id) => {
    console.log('Show ...', id)
  }
    
  return (
    <div className='bg-white shadow-md rounded-lg py-5 px-5 text-center mx-2 my-2 text-gray-500'>
      <div className='flex justify-between'>
        <p className='uppercase'>{ name.replace('.mp4', '') }</p>
        <p>{ formatDate(createdTime) }</p>
      </div>

      <iframe 
        className='mx-3 my-3 rounded-lg'
        src={ src }
        width="384" 
        height="216" 
        allow="autoplay"
      />

      <button 
          className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'
          onClick={openModal}
        >
        Ver en pantalla completa
      </button>

      <div className='container w-1/2 h-1/2 flex justify-center text-center'>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div className='text-center'>

          <div className='flex justify-around'>
            <p className='uppercase'>{ name.replace('.mp4', '') }</p>
            <p>{ formatDate(createdTime) }</p>
          </div>

            <iframe 
              className='mx-3 my-3'
              src={ src }
              width="854" 
              height="480" 
              allow="autoplay"
            />
              
            <button 
              className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-5' 
              onClick={closeModal}>Cerrar
            </button>
          
          </div>
        </Modal>
      </div>


    </div>
  )
}

export default Frame