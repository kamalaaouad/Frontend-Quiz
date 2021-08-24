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
                window.location.replace("/admin");
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
        setObjetAnswer([...objetAnswer, { answerContent: " ", correct: false, id: '' }]);
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
                                    {question.answers && question.answers.length > 0 ? (
                                        question.answers.map((answer, i) => {
                                            
                                            return(
                                            <div key={i}>
                                                
                                                <div className="input-group ml-2">
                                                    <div className="input-group-text">
                                                        <input className="form-check-input mt-0" onChange={(e) => handleAnswerChange(e, i,answer.id)} type="checkbox" name={"correct"} value={answer.correct}  defaultChecked={answer.correct ? true : false} />
                                                    </div>
                                                    <input type="text" className="form-control" onChange={(e) => handleAnswerChange(e, i,answer.id)} name={"answerContent"} defaultValue={answer.answerContent} />
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
                </div>
            ) : ("")}

        </div>
    )
}

export default EditQuiz
