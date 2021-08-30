import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './ListQuiz.css';
import logo from '../../questionnaire.png';
import quizService from '../../services/serviceQuiz/quiz.service';

function ListQuiz() {
    const [allQuiz, setAllQuiz] = useState([]);


    useEffect(() => {
        retirieveAllQuiz();
    }, [])

    const retirieveAllQuiz = async () => {
        await quizService.getAll()
            .then(res => {
                setAllQuiz(res.data);
                console.log(res.data);
                console.log(allQuiz);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleRemoveQuiz=(id)=>{
        quizService.deleteQuizById(id)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
        window.location.reload();
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">
                            <div className="table-responsive">
                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>Quiz</span></th>
                                            <th><span>Nombre qe quistion par quiz</span></th>
                                            <th>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allQuiz && allQuiz.map((quiz) => (
                                            <tr key={quiz.id}>
                                                <td>
                                                    <img src={logo} alt="" />
                                                    <a href={"/admin/quiz/"+quiz.id} className="user-link" >{quiz.title}</a>
                                                    <span className="user-subhead"><i style={{ color:'#c080ff' }}>Identifiant ::</i> {quiz.id}</span>
                                                </td>
                                                <td>
                                                   {quiz.questions.length} {quiz.questions.length >= 2 ? 'Questions':'Question'}
                                                </td>
                                                <td style={{ width: '20%' }}>
                                                    <a href={'/admin/editquiz/'+quiz.id} className="table-link">
                                                        <span className="fa-stack">
                                                            <i className="fa fa-square fa-stack-2x"></i>
                                                            <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                    <a href='/admin' onClick={()=>handleRemoveQuiz(quiz.id)} className="table-link danger">
                                                        <span className="fa-stack">
                                                            <i className="fa fa-square fa-stack-2x"></i>
                                                            <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                        </span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListQuiz
