import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions}) {

  useEffect( () => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(data => setQuestions(data))
  }, [])

  function deleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions ? questions.map(qs => (
        <QuestionItem key={qs.id} question={qs} deleteQuestion={deleteQuestion}/> 
      )) : <p>Loading...</p>}</ul>
    </section>
  );
}

export default QuestionList;