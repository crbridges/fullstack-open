import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad;
  let average = (1 * good - 1 * bad) / all;
  let positive = good / all;

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='Good' onClick={() => setGood(good + 1)} />
      <Button text='Neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='Bad' onClick={() => setBad(bad + 1)} />
      
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive * 100} %</p>
    </div>
  )
}

export default App