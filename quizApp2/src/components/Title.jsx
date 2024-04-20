import { useState } from "react";

function Title(props) {
  return (
    <div>
      <h1>QuizApp</h1>
      <h1 id="category">{props.category}</h1>
    </div>
  );
}

export default Title;
