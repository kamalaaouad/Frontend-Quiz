import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalSendQuizByCondidat = (props) => {
    
    const handleClose = (e) => {
        props.onCloseModal && props.onCloseModal(e);
    }
    const showToast = () => {
        toast('🦄 Your Score is '+props.scoreList+' of '+props.numberOfQuestion, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    };
    const handleRepeat=()=>{
        window.location.reload();
    }
    const handleExit=()=>{
        console.log("exit")
        window.location.replace("/");
    }
    return (
        <div>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
            <Modal show={props.showModal}>
                <Modal.Header>
                    <span>👋🏻 Hello </span>
                    <div className="modal-close"
                        onClick={e => {
                            handleClose(e);
                        }}
                    >
                        X
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Welcome Again 🦄</Form.Label>
                        <Form.Text className="text-muted">
                        what do you want ?
                        </Form.Text>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" style={{ backgroundColor: '#00FF00' }}
                        onClick={() => showToast()}
                    >Want u show your score</Button>
                    <Button variant="primary" style={{ backgroundColor: '#7fffd4' }}
                    onClick={() => handleRepeat()}
                    >Repeat</Button>
                    <Button variant="primary"
                    onClick={ handleExit}
                    >Exit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ModalSendQuizByCondidat;