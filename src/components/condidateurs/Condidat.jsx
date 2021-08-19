import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './Condidat.css';
import { useEffect } from 'react';
import quizService from '../../services/serviceQuiz/quiz.service';
function Condidat(props) {
    const [quiz, setQuiz] = useState({});
    const [answer,setAnswer]=useState([{answerContent:null,correct:false,id:null}]);
    const [questionList,setQuestionList]=useState([{questionContent:"",answers:[],id:""}]);
    const [indexOfQuestion, setIndexOfQuestion] = useState(0);
    const [ischecked, setIsChecked] = useState([]);


    useEffect(() => {
        let arrayAnswer=[];
        let arrayQuestion=[];
        
        quizService.getQuizById(props.match.params.id)
            .then(res => {
                console.log(res.data.questions);
                setQuiz(res.data);
                console.log(quiz);
                // setIndexOfQuestion(0);
                // console.log(answer);
                res.data.questions.forEach(()=>{
                    arrayQuestion.push({questionContent:"",answers:[],id:""});
                    setQuestionList(arrayQuestion);
                })
                res.data.questions[indexOfQuestion].answers.forEach(() => {
                    arrayAnswer.push({answerContent:null,correct:false,id:null})
                    setAnswer(arrayAnswer);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const onNextClick=()=>{
        // let initial=[]
        // setIsChecked(initial);
        // console.log(ischecked);
        let index=0;
        console.log(questionList);
        console.log(quiz.questions[indexOfQuestion].id);
        console.log(answer);
        let list=[...questionList];
        list[indexOfQuestion]["questionContent"]=quiz.questions[indexOfQuestion].questionContent;
        list[indexOfQuestion]["id"]=quiz.questions[indexOfQuestion].id;
        list[indexOfQuestion]["answers"]=answer;
        setQuestionList(list)
        console.log(list);
        if(quiz.questions && indexOfQuestion+1 <quiz.questions.length){
            console.log("yes enter")
            let arrayAnswer=[];
            index=indexOfQuestion+1;
            setIndexOfQuestion(index);
            console.log(index);
            ( quiz.questions[indexOfQuestion+1] && quiz.questions[indexOfQuestion+1].answers.forEach(() => {
                arrayAnswer.push({answerContent:null,correct:false,id:null});
                setAnswer(arrayAnswer);
            }));
        }else{
            console.log("score");
            alert("show score")
        }
        console.log(answer)
        console.log("index "+indexOfQuestion);
        // setIsChecked(false);
        // ischecked=false;
    }
    const onPrevClick=()=>{
        setIndexOfQuestion(indexOfQuestion-1);
        console.log(ischecked);
    }

    const onHandleAnswerSelected=(e,i)=>{
        console.log(ischecked);
        let target = e.target;
        let name=target.name;
        let value = target.value;
        let checked = target.checked;
        // (ischecked.includes(name)? () :(ischecked.push(name)));
        console.log(name+" "+value+" "+checked+" "+i);
        if(ischecked.includes(name)){
            if(ischecked.indexOf(name) > -1){
                ischecked.splice(ischecked.indexOf(name),1);
            }
        }else{
            ischecked.push(name)
        }
        const list=[...answer];
        list[i]["answerContent"]=value;
        list[i]["correct"]=checked;
        list[i]["id"]=name;
        setAnswer(list);
        console.log(list);
        
        // setIsChecked(false);
    }
    const handleSubmit=()=>{
        console.log(questionList);
    }
    return (
        <>
            {quiz.questions && indexOfQuestion < quiz.questions.length ?
                (
                    <div className="wrapper">
                        <div className="wrap" id="q1">
                            <div className="text-center pb-4">
                                <div className="h5 font-weight-bold"><span id="number"> </span>{indexOfQuestion+1}of {quiz.questions && quiz.questions.length} </div>
                            </div>
                            <div className="h4 font-weight-bold"> {parseInt(indexOfQuestion) + 1}. {quiz.questions[indexOfQuestion].questionContent}?</div>
                            {quiz.questions[indexOfQuestion].answers && quiz.questions[indexOfQuestion].answers.length > 0 ?
                            (quiz.questions[indexOfQuestion].answers.map((item, i) => (
                                <div className="pt-4" key={`${indexOfQuestion}-${i}`} >
                                    {/* {console.log(`${indexOfQuestion}-${i}`)} */}
                                    <label className="options" htmlFor={`question_${indexOfQuestion}_answer_${i}`}>{item.answerContent}<input type="checkbox" id={`question_${indexOfQuestion}_answer_${i}`} onChange={(e)=>onHandleAnswerSelected(e,i)} value={item.answerContent} name={item.id} defaultChecked={ischecked.includes(item.id)} />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            ))):(<h1>pas de reponse</h1>)}

                            <div className="d-flex justify-content-end pt-2">
                                {((quiz.questions) && (indexOfQuestion <= quiz.questions.length)) && (indexOfQuestion >= 1) ? (
                                <button className="btn btn-primary mx-3" id="back1" onClick={()=>onPrevClick()}> <span className="fa fa-arrow-left pr-1"></span>Previous
                                </button>) : ("")}
                                
                                <button className="btn btn-primary" id="next2" onClick={()=>onNextClick()}>
                                {((quiz.questions) && (parseInt(indexOfQuestion)+1 < quiz.questions.length)) ? (
                                    "Next" ):("Save")}
                                    <span className="fa fa-arrow-right"></span>
                                </button>

                                {((quiz.questions) && (indexOfQuestion+1 === quiz.questions.length)) ?
                                    (<button className="btn btn-primary" id="next3" onClick={handleSubmit}>Submit
                                    </button>) : ("")}

                            </div>
                        </div>
                    </div>
                ) : ('')

            }

        </>
    );
}

export default Condidat
