import React, { Component } from "react";
import quizQuestions from "../api/quizQuestions";
import Quiz from "./Quiz";
import Result from "./Result";
class QuizInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionId: 0,
            question: "",
            answerOptions: [],
            answer: "",
            answersCount: {},
            result: [],
            showReportsQuestion: false
        };
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }
    componentDidMount() {
        const AnswerOptions = quizQuestions.map((item) =>
            item.answers
        );
        let index;
        let questionItems = localStorage.getItem('quizData');
        let allQuestionItems = JSON.parse(localStorage.getItem('quizData'))
        if (typeof questionItems === "undefined" || questionItems === null) {
            index = 0;
            this.setState({
                question: quizQuestions[index].question,
                answerOptions: AnswerOptions[index],
                questionId: index,
            });
        } else {
            index = allQuestionItems.length
            if (allQuestionItems.length >= quizQuestions.length) {
                setTimeout(() => this.setReports(), 300);
            }
            else {
                this.setState({
                    question: quizQuestions[index].question,
                    answerOptions: AnswerOptions[index],
                    questionId: index,
                });
            }
        }
    }
    handleAnswerSelected(event) {
        this.setState(({ answer: event.currentTarget.value }));
        const { questionId, question } = this.state
        this.setQuestionAnswer(questionId, question, event.currentTarget.value)
        if (this.state.questionId < quizQuestions.length - 1) {
            setTimeout(() => this.setNextQuestion(), 300);
        } else {
            setTimeout(() => this.setReports(), 300);
        }
    }
    setQuestionAnswer(idItem, titleQuestion, answerItem) {
        const result = {
            idQuestion: idItem,
            titleQuestion: titleQuestion,
            questionAns: answerItem
        }
        let questionItems = localStorage.getItem('quizData');
        let allQuestionItems = [];
        if (typeof questionItems !== 'undefined' && questionItems !== null) {
            allQuestionItems = JSON.parse(localStorage.getItem('quizData'))
        }
        allQuestionItems.push(result);
        localStorage.setItem('quizData', JSON.stringify(allQuestionItems))
    }
    setNextQuestion() {
        const questionId = this.state.questionId + 1;
        this.setState({
            questionId: questionId,
            question: quizQuestions[questionId].question,
            answerOptions: quizQuestions[questionId].answers,
            answer: "",
        });
    }
    setReports() {
        const allData = JSON.parse(localStorage.getItem('quizData'));
        this.setState({ result: allData })
        this.setState({ showReportsQuestion: true })
    }
    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }
    renderResult() {
        return <Result quizResult={this.state.result} />;
    }
    render() {
        return (
            <div className="quiz-info">
                {this.state.showReportsQuestion ? this.renderResult() : this.renderQuiz()}
            </div>
        );
    }
}
export default QuizInfo;
