import React, { useState,useEffect } from 'react';
import './ModalQuestion.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input } from 'reactstrap';

import QuizDataService from '../../services/serviceQuiz/quiz.service';
import QuestionDataService from '../../services/serviceQuestion/question.service';


function ModalQuestion(props) {
    const [inputList, setInputList] = useState([{ answerContent: "", correct: false }]);
     const [name, setName] = useState("");
     const [allQuiz, setAllQuiz] = useState([]);
     const [idQuiz, setIdQuiz] = useState('');

    
    useEffect(() => {
        QuizDataService.getAll().then(res=>{
            setAllQuiz(res.data);
            console.log(res);
            console.log(allQuiz)
        }).catch(err=>{
            console.log(err);
        })
    }, 
     []
    )
    const handleClose = (e) => {
        props.onCloseQt && props.onCloseQt(e);
    }
    const handleClickAdd = () => {
        setInputList([...inputList, { answerContent: "", correct: false }]);
    }
    
   const handleChangeAnswer = (e,i) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        let checked = target.checked;
        console.log(name+' handleChangeAnswer '+value);
        console.log(name+' handleChangeAnswer '+checked);
            const list = [...inputList];
            list[i][name] =(name ==='answerContent')? value:checked;
            setInputList(list);      

    }
    
   const handleQuestion = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        setName(value);
        console.log(name+' handleCorrectAnswerChange '+value)
        console.log(name+' handleCorrectAnswerChange '+value)
        
    }
    const handleSubmit=()=>{
        console.log(name)
        console.log(JSON.stringify(inputList));
        console.log(idQuiz);
        var data ={
            answers:inputList,
            questionContent : name
        };
        console.log(data);
        console.log('idquiz 1 '+idQuiz);
        QuestionDataService.create(idQuiz,data).then((response)=>{
            console.log(response.data);
          }).catch(e => {
            console.log(e);})
    }
    const handleChnageIdqQuiz=(e)=>{
        let target = e.target;
        let value = target.value;
        console.log(value)
        setIdQuiz(value);
        console.log(idQuiz);
    }
    return (
        <div>

            <Modal isOpen={props.showQt} fade={false} >
                <ModalHeader >
                    <div className="modal-close"
                        onClick={e => {
                            handleClose(e);
                        }}
                    >
                        X
                    </div>
                    <FormGroup row>
                        <Label for="exampleSelect" sm={15}>Choice Theme of Quiz</Label>
                        <Col sm={10}>
                            <Input type="select"
                                onChange={handleChnageIdqQuiz} 
                                value="choice them" className="option" name="select" id="exampleSelect">
                                {allQuiz && allQuiz.map((quiz,index) => (
                                    <option value={quiz.id} key={index} tabIndex={index}>{quiz.title}</option>
                                ))}
                            </Input>
                        </Col>
                    </FormGroup>
                </ModalHeader>

                <ModalBody>


                    <input className="option" type="text" name="question"
                       onChange={(e) => handleQuestion(e)}
                        placeholder="Question" required />
                    <div className="modal-section">
                        <div className="question-section">
                            {inputList.map((item, index) => {
                                console.log(index+' '+item)
                                return (
                                    <div  key={index}>
                                        <input className="option" type="text" name={"answerContent"}
                                            onChange={(e) => handleChangeAnswer(e, index)}
                                            // value={item.option_1}
                                            placeholder={"Option №"+parseInt(index)+1} required  />
                                    </div>
                                );
                            })}
                            <input className="option" type="button" value="Send"
                            onClick={()=>handleSubmit()} 
                            />
                        </div>
                        <div className="checkbox-section">
                            {inputList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <input type="checkbox" name={"correct"}
                                        value={item.checked}
                                        onChange={(e) => handleChangeAnswer(e,index)} 
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                </ModalBody>

                <ModalFooter>
                    <Button color="danger"
                    // onClick={this.toggle}
                    >-</Button>{' '}
                    <Button color="success"
                        onClick={handleClickAdd}
                    >+</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalQuestion
