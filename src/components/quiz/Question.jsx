import React from 'react'

function Question(props) {
    console.log(props.questions);
    return (
        <div>
            <div className="h4 font-weight-bold"> {parseInt(props.indexOfQuestion) + 1}. {props.questions.questionContent}?</div>
                            {props.questions.answers && props.questions.answers.length > 0?
                            (props.questions.answers.map((item, i) => (
                                <div className="pt-4" key={i} >
                                    <label className="options">{item.answerContent} <input type="checkbox" onChange={props.onHandleAnswerSelected} value={i} name="checkbox" defaultChecked={false} />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            ))):(<h1>pas de reponse</h1>)}

                            <div className="d-flex justify-content-end pt-2">
                                {((props.questions) && (props.indexOfQuestion <= props.size)) && (props.indexOfQuestion >= 1) ? (
                                <button className="btn btn-primary mx-3" id="back1" onClick={()=>props.onPrevClick()}> <span className="fa fa-arrow-left pr-1"></span>Previous
                                </button>) : ("")}
                                {((props.questions) && (parseInt(props.indexOfQuestion)+1 < props.size)) ? (
                                <button className="btn btn-primary" id="next2" onClick={()=>props.onNextClick()}>Next <span className="fa fa-arrow-right"></span>
                                </button>):("")}

                                {((props.questions) && (props.indexOfQuestion+1 === props.size)) ?
                                    (<button className="btn btn-primary" id="next3">Submit
                                    </button>) : ("")}

                            </div>
        </div>
    )
}

export default Question




{/* <Question
questions={quiz.questions[indexOfQuestion]}
indexOfQuestion={indexOfQuestion}
size={quiz.questions.length}
onHandleAnswerSelected={(event) => onHandleAnswerSelected(event)}
onPrevClick={()=>onPrevClick()}
onNextClick={()=>onNextClick()}
// onSubmit={() => this.handleSubmit()}
/> */}