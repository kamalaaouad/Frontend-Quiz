import React, { useState, useEffect } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import './QuizWithQuestion.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import quizService from '../../services/serviceQuiz/quiz.service';

function QuizWithQuestion(props) {
    const [quizById, setQuizById] = useState({});

    useEffect(() => {
        getQuizById();
    }, [])
    // console.log("id de component "+props.match.params.id);

    const getQuizById = () => {
        quizService.getQuizById(props.match.params.id)
            .then(res => {
                setQuizById(res.data);
                // console.log(res.data);
                // console.log(quizById)
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            <div style={{ margin: '30px auto ',background: 'white', padding: '20px 15px'}}>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-center">
                            <h2 style={{ color:'orange',border:'3px #990899 solid' }}>{quizById.title}</h2>
                        </div>
                    </div>
                    <hr style={{ color:'orange'}}/>
                    <hr/>
                    <hr style={{ color:'orange'}}/>
                    {quizById.questions && quizById.questions.length > 0 ? (quizById.questions.map((item, index) => (
                        <div className="col-9" key={index}>
                            <p className="fw-bold" >{item.questionContent} ?</p>
                            { item.answers.length > 0 ? (
                                item.answers.map((itm) => (

                                    <div key={itm.id}>
                                        <input type="checkbox" name="box" id="one" checked={itm.correct ? true:false}/>
    
                                        <label htmlFor="one" className="box first">
                                            <div className="course">
                                                <span className="circle"></span>
                                                <span className="subject"> {itm.answerContent} </span>
                                            </div>
                                        </label>
                                    </div>
                                )
                                )
                            ):(<div className="p-3 bg-warning my-2 rounded" style={{ width: "30%" }}>
                            <Toast >
                              <ToastHeader>
                                Attention
                              </ToastHeader>
                              <ToastBody>
                                Cette Question n'ayant pas de réponse
                              </ToastBody>
                            </Toast>
                          </div>) }
                        </div>
                    ))):(<div className="p-3 bg-danger my-2 rounded" style={{ width: "30%" }}>
                    <Toast >
                      <ToastHeader>
                        Attention
                      </ToastHeader>
                      <ToastBody>
                        Cette Quiz n'ayant pas de question en cours
                      </ToastBody>
                    </Toast>
                  </div>)}
                    <div className="col-12">
                        <div className="d-flex justify-content-center"> <button onClick={()=>{window.location.replace('/');}} className="btn btn-primary px-4 py-2 fw-bold"> Go Back</button> </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QuizWithQuestion
