import React, {useState} from "react";

function QuestionItem({ question, deleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correctAnswer, setCorrectAnswer] = useState(correctIndex);


  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(() => deleteQuestion(question))
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function updateAnswer(e) {
    setCorrectAnswer(e.target.value)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"correctIndex": e.target.value})
    })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={e => updateAnswer(e)} defaultValue={correctAnswer}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;