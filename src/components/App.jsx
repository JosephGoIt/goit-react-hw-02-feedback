import { Component } from "react"
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import Notification from "./Notification/Notification";
import Section from "./Section/Section";

export class App extends Component {
  //Initital State
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  //Track Feedback
  countTotalFeedback = () => {
    const {good, neutral, bad} = this.state;
    return good + neutral + bad;
  };

  //Percentage of good Feedback
  countGoodFeedback = () => {
    const {good, neutral, bad} = this.state;
    const total = good + neutral + bad;
    return total ? (good / total) * 100 : 0;
  };

  //change state when clicked
  handleClick = type => {
    this.setState(prevState => ({
      ...prevState,
      [type]: prevState[type]+1,
    }));
  };

  render() {
    const {good, neutral, bad} = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countGoodFeedback().toFixed(0);
    const options = ['good', 'neutral', 'bad'];
  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={this.handleClick}/>
      </Section>
      <Section title="Statistics">
        {total > 0 ?
        (<Statistics  good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage}/>)
        :
        (<Notification message="There is no feedback"/>)}
      </Section>
    </div>
  );
}
}
