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

export default Course