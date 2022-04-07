import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
  return (
    <div className='result-content'>
      {props.quizResult.map((item) => {
        return <p className="report" key={item.idQuestion}>
          <span>{item.idQuestion + 1}</span>
          <span> {item.titleQuestion}</span>
          <p><span> Answer: </span> <strong> {item.questionAns}</strong></p>

        </p>
      })

      }
    </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.array.isRequired
};

export default Result;
