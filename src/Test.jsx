import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import './Condidat.css';
import './App.css';
import { useEffect } from 'react';
import quizService from './services/serviceQuiz/quiz.service';
function Test() {
  const [quiz, setQuiz] = useState({});
  const [answer, setAnswer] = useState([{ answerContent: "", correct: false, id: "" }]);
  const [questionList, setQuestionList] = useState([{ questionContent: "", answers: [], id: "" }]);
  const [indexOfQuestion, setIndexOfQuestion] = useState(0);
  const [ischecked, setIsChecked] = useState(false);


  useEffect(() => {
    let arrayAnswer = [];
    let arrayQuestion = [];

    quizService.getQuizById(4)
      .then(res => {
        console.log(res.data.questions.length);
        setQuiz(res.data);
        console.log(answer);
        res.data.questions.forEach(() => {
          arrayQuestion.push({ questionContent: "", answers: [], id: "" });
          setQuestionList(arrayQuestion);
        })
        res.data.questions[indexOfQuestion].answers.forEach(() => {
          arrayAnswer.push({ answerContent: "", correct: false, id: "" })
          setAnswer(arrayAnswer);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [setQuiz]);

  const onNextClick = () => {
    let index = 0;
    console.log(questionList);
    console.log(quiz.questions[indexOfQuestion].id);
    console.log(answer);
    let list = [...questionList];
    list[indexOfQuestion]["questionContent"] = quiz.questions[indexOfQuestion].questionContent;
    list[indexOfQuestion]["id"] = quiz.questions[indexOfQuestion].id;
    list[indexOfQuestion]["answers"] = answer;
    setQuestionList(list)
    console.log(list);
    if (quiz.questions && indexOfQuestion + 1 < quiz.questions.length) {
      console.log("yes enter")
      let arrayAnswer = [];
      index = indexOfQuestion + 1;
      setIndexOfQuestion(index);
      console.log(index);
      (quiz.questions[indexOfQuestion + 1] && quiz.questions[indexOfQuestion + 1].answers.forEach(() => {
        arrayAnswer.push({ answerContent: "", correct: false, id: "" });
        setAnswer(arrayAnswer);
      }));
    } else {
      console.log("score");
      alert("show score")
    }
    console.log(answer)
    console.log("index " + indexOfQuestion);
    setIsChecked(false);
    // ischecked=false;
  }
  const onPrevClick = () => {
    setIndexOfQuestion(indexOfQuestion - 1);
  }

  const onHandleAnswerSelected = (e, i) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    let checked = target.checked;
    console.log(name + " " + value + " " + checked + " " + i);
    const list = [...answer];
    list[i]["answerContent"] = value;
    list[i]["correct"] = checked;
    list[i]["id"] = name;
    setAnswer(list);
    console.log(list);

    // setIsChecked(false);
  }
  const handleSubmit = () => {
    console.log(questionList);
  }
  return (
    <>
      {quiz.questions && quiz.questions.map((item, index) => (
        <div className="wrapper">
          <div className="wrap" id="q1">
            <div className="text-center pb-4">
              <div className="h5 font-weight-bold"><span id="number"> </span>{index + 1}of {quiz.questions && quiz.questions.length} </div>
            </div>
            <div className="h4 font-weight-bold"> {parseInt(index) + 1}. {item.questionContent}?</div>
            {item.answers && item.answers.length > 0 ?
              (item.answers.map((itemm, i) => (
                <div className="pt-4" key={i} >
                  <label className="options">{itemm.answerContent} {console.log(ischecked)}<input type="checkbox" onChange={(e) => onHandleAnswerSelected(e, i)} value={itemm.answerContent} name={itemm.id} />
                    <span className="checkmark"></span>
                  </label>
                </div>
              ))) : (<h1>pas de reponse</h1>)}

            <div className="d-flex justify-content-end pt-2">
              
                <button className="btn btn-primary mx-3" id="back1" onClick={() => onPrevClick()}> <span className="fa fa-arrow-left pr-1"></span>Previous
                </button>

              <button className="btn btn-primary" id="next2" onClick={() => onNextClick()}>
                
                  Next
                <span className="fa fa-arrow-right"></span>
              </button>

             
                <button className="btn btn-primary" id="next3" onClick={handleSubmit}>Submit
                </button>

            </div>
          </div>
        </div>


      ))}


    </>
  );
}

export default Test;
