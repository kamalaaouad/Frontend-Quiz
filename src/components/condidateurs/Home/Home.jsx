import React, { useState, useEffect } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import quizService from '../../../services/serviceQuiz/quiz.service';
// import Condidat from '../Condidat';
function Home() {
    const [allQuiz, setAllQuiz] = useState([]);
    const [idQuiz,setIdQuiz]=useState();
    const [userName,setUerName]=useState("");

    useEffect(() => {
        quizService.getAll().then(res => {
            setAllQuiz(res.data);
            console.log(res);
            console.log(allQuiz)
        }).catch(err => {
            console.log(err);
        })
    },
        [setAllQuiz]
    )
    const handleGetQuiz = (e) => {
        let target = e.target;
        let value = target.value;
        console.log(value)
        setIdQuiz(value);
    }
    const handleChangeUseName=(e)=>{
        console.log(e.target.value);
        setUerName(e.target.value);
    }
    const handleStartQuiz=()=>{
         localStorage.setItem("username",userName);
        window.location.replace('/evaluation/'+idQuiz);
    }
    return (
        <div>
            <>
                <div className="login-dark" style={{ height: "695px" }}>
                    <div className="form">
                        <h2 style={{ textAlign: "center" }}>Quiz</h2>
                        <div className="form-group">
                            <select className="form-control-select" onChange={handleGetQuiz} defaultValue={'DEFAULT'} >
                                <option value="DEFAULT"  disabled hidden>
                                    Select an Quiz
                                </option>
                                {allQuiz && allQuiz.map((quiz, index) => (
                                    <option value={quiz.id} key={index} >{quiz.title}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group"><input className="form-control" type="text" name="username" placeholder="UserName" onChange={(e)=>handleChangeUseName(e)} /></div>
                        <div className="form-group"><button className="btn btn-primary btn-block form-control" onClick={()=>handleStartQuiz()}> Start Quiz</button></div>
                        <div>
                            <a className="forgot" href="/#">Are You Admin ?</a>
                        </div>

                    </div>
                </div>
            </>
            
        </div>
    )
}

export default Home
