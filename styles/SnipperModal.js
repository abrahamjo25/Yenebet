import React,{useState} from 'react';
import SkewLoader from "react-spinners/BounceLoader";
import Modal from "react-modal";
;

const SnipperModal=()=> {
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
    const [modalIsOpen, setIsOpen] = React.useState(true);
   
    return (
        <div>
        <Modal isOpen={modalIsOpen}  style={customStyles} className="Modal" overlayClassName="Overlay">
            <SkewLoader color="#c7d5e0"size={40} speedMultiplier={3} />
        </Modal>
    </div>
    );
}

export default SnipperModal;