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
  const {name, parts} = course;
  return (
    <>
    <Header course={name} />
    <Content parts={parts} />
    <Total total={parts.reduce((sum, part)=> sum + part.exercises, 0)} />
    </>
  )
}

const Courses = ({courses}) => {
  return (
    <>{courses.map(course => <Course course={course} />)}</>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App