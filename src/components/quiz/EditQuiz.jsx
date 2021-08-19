import React, { useState, useEffect } from 'react'
import './EditQuiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import quizService
    from '../../services/serviceQuiz/quiz.service';
import questionService from '../../services/serviceQuestion/question.service';
function EditQuiz(props) {
    const [quizById, setQuizById] = useState({});
    const [showQuestion, setShowQuestion] = useState(false);
    const [title, setTitle] = useState("");
    const [idQuiz, setIdQuiz] = useState(Number);
    const [objetAnswer, setObjetAnswer] = useState([{ answerContent: " ", correct: false, id: '' }]);
    const [idQuestion, setIdQuestion] = useState(Number);
    const [questionConetntt, setQuestionContentt] = useState("");


    useEffect(() => {
        getQuizById();
        // setObjetAnswer(quizById.questions.answers);
    }, [])
    const getQuizById = () => {
        quizService.getQuizById(props.match.params.id)
            .then(res => {
                setQuizById(res.data);
                console.log(res.data);
                setIdQuiz(res.data.id);
                console.log(res.data.id);
                console.log(quizById.length);
            })
            .catch(error => {
                console.log(error);
            })
    }
    const onChangeTitle = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        console.log(name + " " + value)
        setTitle(value);
    }
    const updateQuiz = () => {
        var data = {
            title: title
        };
        console.log(data);
        console.log(idQuiz);
        quizService.updateQuiz(idQuiz, data)
            .then(response => {
                console.log(response.data);
                window.location.replace("/");
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleQuestionContent = (e, id) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        setQuestionContentt(value);
        setIdQuestion(id);
        console.log(id);
        console.log(name + " " + questionConetntt);
    }
    const handleAnswerChange = (e, i,identifiant) => {
        console.log(e);
        console.log('id ='+identifiant+'index ='+i);
        let target = e.target;
        let name = target.name;
        let value = target.value;
        let checked = target.checked;
        console.log(name+' handleChangeAnswer '+value);
        console.log(name+' handleChangeAnswer '+target.checked);
            const list = [...objetAnswer];
           
            list[i][name] =(name ==='correct')? checked:value;
            list[i]['id']=identifiant; 
            setObjetAnswer(list);
            // setObjetAnswer([...objetAnswer, { answerContent: " ", correct: false, id: '' }]);
    }
    const updateQuestion = () => {
        console.log(JSON.stringify(objetAnswer));
        console.log(idQuestion);
        var data ={
            answers:objetAnswer,
            questionContent : questionConetntt
        };
        console.log(data);
        questionService.updateQuestion(idQuestion,data)
        .then(res=>{
            console.log(res.data);
            window.location.reload();
        }).catch(err=>{
            console.log(err);
        })
        
    }
    const handleResizeObject=()=>{
        console.log("yes kamal");
        setObjetAnswer([...objetAnswer, { answerContent: " ", correct: false, id: '' }]);
        console.log(objetAnswer);
    }
    return (
        <div className="container mt-3">
            <div className="edit-form">
                <h4>Quiz</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            defaultValue={quizById.title}
                            onChange={onChangeTitle}
                        />
                    </div>
                </form>
                <button
                    className={showQuestion ? "btn btn-secondary mr-2" : "btn btn-warning mr-2"}
                    //on peut passer l'objet ici mais peut declancher un probleme a cote client
                    //on passe juste id de quiz et on recuper la question avec ses reponse
                    onClick={() => {
                        setShowQuestion(!showQuestion);
                    }}
                >
                    {showQuestion ? 'Cacher Questions' : 'Edit Questions'}
                </button>
                <button
                    className="btn btn-danger mr-2"
                // onClick={this.deleteTutorial}
                >
                    Delete
                </button>

                <button
                    type="submit"
                    className="btn btn-success"
                    onClick={() => updateQuiz()}
                >
                    Update
                </button>
            </div>
            {showQuestion ? (
                <div className="listquestion">
                    {/* <form> */}
                        {quizById.questions && quizById.questions.length > 0 ? (
                            quizById.questions.map((question, index) => (
                                <div className="form-group" key={index}>
                                    <label htmlFor="title">Question {parseInt(index) + 1}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        defaultValue={question.questionContent}
                                        onChange={(e) => handleQuestionContent(e,question.id)}
                                    />
                                    {/* {setCount(question.answers.length)} */}
                                    {question.answers && question.answers.length > 0 ? (
                                        // setCount(question.answers.length),
                                        question.answers.map((answer, i) => {
                                            
                                            return(
                                            <div key={i}>
                                                
                                                <div className="input-group ml-2">
                                                    <div className="input-group-text">
                                                        {/* <input type="hidden" name="id" onChange={(e) => handleAnswerChange(e, i)} defaultValue={parseInt(answer.id)} /> */}
                                                        <input className="form-check-input mt-0" onChange={(e) => handleAnswerChange(e, i,answer.id)} type="checkbox" name={"correct"} value={answer.correct}  defaultChecked={answer.correct ? true : false} />
                                                    </div>
                                                    <input type="text" className="form-control" onChange={(e) => handleAnswerChange(e, i,answer.id)} name={"answerContent"} defaultValue={answer.answerContent} />
                                                    {/* <a className="list-group-item" href='/#'><i class="fa fa-pencil fa-fw" aria-hidden="true"></i></a> */}
                                                </div>
                            
                                            </div>);
                                        })
                                    ) : ("")}
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={() => updateQuestion()}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-red"
                                        onClick={() => handleResizeObject()}
                                    >
                                        <i className="fa fa-pencil fa-fw" aria-hidden="true"></i>
                                    </button>
                                     
                                </div>
                            ))
                        ) : ("")}
                    {/* </form> */}
                </div>
            ) : ("")}

        </div>
    )
}

export default EditQuiz
