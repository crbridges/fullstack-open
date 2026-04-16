import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  return (
      <>
        <h1>Statistics</h1>
        <p>Good: {props.stats.good}</p>
        <p>Neutral: {props.stats.neutral}</p>
        <p>Bad: {props.stats.bad}</p>
        <p>All: {props.stats.all}</p>
        <p>Average: {props.stats.average}</p>
        <p>Positive: {props.stats.positive * 100} %</p>
      </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  let stats = {
    "good":good,
    "neutral":neutral,
    "bad":bad,
    "all": good + neutral + bad,
    "average": (1 * good - 1 * bad) / (good + neutral + bad),
    "positive": good / (good + neutral + bad),
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='Good' onClick={() => setGood(good + 1)} />
      <Button text='Neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='Bad' onClick={() => setBad(bad + 1)} />
      
      <Statistics stats={stats}/>
    </div>
  )
}

export default App