import React from 'react';
import PropTypes from 'prop-types';

function Question(props) {
  return <h3 className="question">{props.questionId + 1}- {props.content}</h3>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
