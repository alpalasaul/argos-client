import { useState } from 'react'
import Modal from 'react-modal'

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

  const { id, createdTime, name } = frame
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function putSrc(id) {
    return `https://drive.google.com/file/d/${id}/preview`
  }

  const formatDate = (createdTime) => {
    return createdTime.split('T')[0]
  }
    
  return (
    <div className='bg-white shadow-md rounded-lg py-5 px-5 text-center mx-2 my-2 text-gray-500'>
      <div className='flex justify-between mx-4'>
        <p className='uppercase'>{ name.replace('.mp4', '') }</p>
        <p>{ formatDate(createdTime) }</p>
      </div>

      {/* <iframe 
        className='mx-3 my-3'
        src={ putSrc(id) }
        width="384" 
        height="216" 
        allow="autoplay"
      /> */}

      <video 
              controls="" 
              autoplay="" 
              width="384" 
              height="216" 
              name="media"
            >
              <source src="https://d1wzcuoplm7ums.cloudfront.net/test_gd.mp4" type="video/mp4"/>
      </video>
      

      <div className='flex justify-between mx-3 mt-4'>
        <a 
            className='bg-amber-500 hover:bg-lime-600 text-white font-bold py-0.5 px-2.5 rounded'
            href={`https://drive.google.com/uc?export=download&id=${id}`}
          >
          Descargar
        </a>

        <button 
            className='bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-0.5 px-2.5 rounded'
            onClick={openModal}
          >
          Maximizar
        </button>
      </div>

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

            {/* <iframe 
              className='mx-3 my-3'
              src={ putSrc(id) }
              width="854" 
              height="480" 
              allow="autoplay"
            /> */}

      <video video 
              controls="" 
              autoplay="" 
              width="854" 
              height="480" 
              name="media"
            >
              <source src="https://d1wzcuoplm7ums.cloudfront.net/test_gd.mp4" type="video/mp4"/>
      </video>
              
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