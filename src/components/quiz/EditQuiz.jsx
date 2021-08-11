import React, { useState, useEffect } from 'react'
import './EditQuiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import quizService
    from '../../services/serviceQuiz/quiz.service';
function EditQuiz(props) {
    const [quizById, setQuizById] = useState({});
    const [showQuestion, setShowQuestion] = useState(false);
    useEffect(() => {
        getQuizById();
    }, [])
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
    const onChangeTitle = () => {

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
                            value={quizById.title}
                            onChange={onChangeTitle}
                        />
                    </div>
                </form>
                <button
                    className={showQuestion ? "btn btn-Info mr-2":"btn btn-warning mr-2"}
                //on peut passer l'objet ici mais peut declancher un probleme a cote client
                //on passe juste id de quiz et on recuper la question avec ses reponse
                onClick={()=>{
                    setShowQuestion(!showQuestion);
                }}
                >
                    {showQuestion ? 'Cacher Questions':'Edit Questions'}
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
                // onClick={this.updateTutorial}
                >
                    Update
                </button>
            </div>
            {showQuestion ? (
                <div className="listquestion">
                <form>
                    {quizById.questions && quizById.questions.length > 0 ? (
                        quizById.questions.map((question, index) => (
                            <div className="form-group" key={index}>
                                <label htmlFor="title">Question {parseInt(index)+1}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={question.questionContent}
                                    onChange={() => onChangeTitle}
                                />
                                {question.answers && question.answers.length > 0 ? (
                                    question.answers.map((answer, i) => (
                                        <div class="input-group ml-2">
                                            <div class="input-group-text">
                                                <input class="form-check-input mt-0" type="radio" value="" checked={answer.correct ? true : false} />
                                            </div>
                                            <input type="text" class="form-control" value={answer.answerContent} />
                                        </div>
                                    ))
                                ) : ("")}
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                // onClick={this.updateTutorial}
                                >
                                    Update
                                </button>
                            </div>
                        ))
                    ) : ("")}
                </form>
            </div>
            ):("")}
            
        </div>
    )
}

export default EditQuiz
