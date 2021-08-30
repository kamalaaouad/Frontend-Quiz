import React,{useState} from 'react'
import './Test.css';
const arrayListQuestions = [
  { id: 1, questionContent: "what are you doing today", idAnswer: 2 },
  { id: 2, questionContent: "what are you doing today", idAnswer: 1 },
  { id: 3, questionContent: "question vide", idAnswer: 4 },
  { id: 4, questionContent: "whate are you doing today", idAnswer: 3 }
];
const arrayListAnswers = [
  { id: 1, answerContent: "what are you doing " },
  { id: 2, answerContent: "what are you doing today" },
  { id: 3, answerContent: "question vide" },
  { id: 4, answerContent: "whate are you kaka" }
];
const Test = () => {
  const [answer, setAnswer] = useState(arrayListAnswers);
  const [question, setQuestion] = useState(arrayListQuestions);
  const [newListResponse,setNewListResponse]=useState([]);
  const [idQ, setIdQ] = useState(0);
  // setAnswer(arrayListQuestions);
  const onDragStart = (ev, id) => {

    console.log('dragstart: ', id);
    ev.dataTransfer.setData("id ", id);
  }
  const onDragOver = (e) => {
    e.preventDefault();
    // console.log(e.target);
  }
  const onDrop = (ev,idd) => {
    console.log(idd);
    let id = ev.dataTransfer.getData("id");
    let arrayList=newListResponse;
    const answerList=answer.filter((aws) => aws.id !== parseInt(id) );
    setIdQ(idd);
    
    answer.map((ans)=>(
      (ans.id ===parseInt(id))?
         arrayList.push(ans):''
    ));

     setNewListResponse(arrayList);
    setAnswer(answerList);
  }
  return (
    <>
      <div className="missing-words">

        <div className="reponses-items">
          <ul className="missing-words__answers">
            {answer.map((qts, index) => (
              <li className="missing-words__answers-item" key={index}
                draggable
                onDragStart={(e) => onDragStart(e, qts.id)}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, qts.id)}
              >
                <span>{qts.answerContent}</span>
              </li>
            ))}
          </ul>
        </div>


        <div className="list-questions">
          <div className="header-question">
            <p className="question-div-header">
              Questions
            </p>
            <p className="answer-div-header">
              Answers
            </p>
          </div>

          {question.map((qts, index) => (
            <div className="body-question" key={index}>
              <p className="content-question"> {qts.questionContent}</p>
              <div className="content-answer">
                <span className="span-answer"
                  onDragOver={(e)=>onDragOver(e)}
                  onDrop={(e) => onDrop(e,qts.id)}
                >
                  {(newListResponse.length > 0)?(newListResponse.map(item=>(
                    (item.id === qts.idAnswer)?
                    item.answerContent
                    :""
                  ))):("") }
                </span>
              </div>

            </div>
          ))}




        </div>

      </div>
    </>
  )
}

export default Test;