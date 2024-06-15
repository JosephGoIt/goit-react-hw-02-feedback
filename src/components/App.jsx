import { Component } from "react"
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics } from "./Statistics/Statistics";
import Notification from "./Notification/Notification";
import Section from "./Section/Section";

export class App extends Component {
  //Initital State
  state = {
    Good: 0,
    Neutral: 0,
    Bad: 0,
  };

  //Track Feedback
  countTotalFeedback = () => {
    const {Good, Neutral, Bad} = this.state;
    return Good + Neutral + Bad;
  };

  //Percentage of good Feedback
  countGoodFeedback = () => {
    const {Good, Neutral, Bad} = this.state;
    const total = Good + Neutral + Bad;
    return total ? (Good / total) * 100 : 0;
  };

  //change state when clicked
  handleClick = type => {
    this.setState(prevState => ({
      ...prevState,
      [type]: prevState[type]+1,
    }));
  };

  render() {
    const {Good, Neutral, Bad} = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countGoodFeedback().toFixed(0);
    const options = ['Good', 'Neutral', 'Bad'];
  return (
    <div>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={this.handleClick}/>
      </Section>
      <Section title="Statistics">
        {total > 0 ?
        (<Statistics  Good={Good} Neutral={Neutral} Bad={Bad} total={total} positivePercentage={positivePercentage}/>)
        :
        (<Notification message="There is no feedback"/>)}
      </Section>
    </div>
  );
}
}
