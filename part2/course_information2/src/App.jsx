const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <ul>
    {props.parts.map(p=> <Part key={p.id} part={p}/>)}
  </ul>
)

const Part = (props) => (
  <li>
    {props.part.name} {props.part.exercises}
  </li>
)

const Total = (props) => <p>Total of {props.total} exercises</p>

const Course = ({course}) => {
  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total total={course.parts.reduce((sum, part)=> sum + part.exercises, 0)} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Pokemon training',
        exercises: 121,
        id: 4
      },
    ]
  }

  return <Course course={course} />
}

export default App