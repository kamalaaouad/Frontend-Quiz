import React, { useRef,useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizDataService from '../../services/serviceQuiz/quiz.service';
function ModalQuiz(props) {
    const [title, setTitle] = useState("");
    const [id, setid] = useState(Number);
    const nodeRef = useRef(null);

    const handleClose = (e) => {
        props.onCloseQz && props.onCloseQz(e);
    }
    const saveQuiz=()=>{
        var data={
            title :title
        };
        console.log(data);
        QuizDataService.create(data)
        .then(response=>{
            setTitle(response.data.title);
            setid(response.data.id);
            console.log(response.data);
            console.log(id+' '+title);
        })
        .catch(e=>{
            console.log(e);
        })

    }
    const onChangeTitle=(e)=>{
        console.log(e.target.value);
        setTitle(e.target.value);
    }
    console.log(props.showQz);
    return (
        <Draggable nodeRef={nodeRef}>
            <div ref={nodeRef}>
                <Modal show={props.showQz}>
                    <Modal.Header>
                        Modal Head Part
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Quiz Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Quiz Name"
                                value={title}
                                onChange={(e)=>onChangeTitle(e)}
                                name="title"
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={(e) => handleClose(e)}
                        >Close</Button>
                        <Button variant="primary"
                        onClick={()=>saveQuiz()}
                        >Save changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Draggable>
    )
}

export default ModalQuiz
