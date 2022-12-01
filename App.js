import './App.css';

import {useState, useEffect} from 'react'
import {BsTrash, BsBookMarkCheck, BsBookMarkCheckFill} from 'react-icons/bs'

const API = "http://localhost:5000"



function App() {
  const [title, setTitle] = useState("")                                           // Vou consutar o título e posso consultar o valor do título
  const [time, setTime] = useState("")                                             // Horario da task
  const [todos, setTodos] = useState([])                                           // Começa com uma lista vazia para inserir as tasks nela 
  const [loading, setLoading] = useState (false)                                   // Uma forma de carregar os dados

  // Load todos on page load

  useEffect(() => {

    const loadData = async() => {                                                  // Vai usar o fatch api e trazer o dato que eu quero
      setLoading(true)                                                             // Vai estar carregando os dados pra mim
    
      // A instrução await está fazendo o código ser segurado até carregar tudo
      const res = await fetch(API + "/todos")                                     // Vai guardar os dados vindo do fatch, o AWAIT funciona porque é uma função assícrona
        .then((res) => res.json())                                                 // Vai transformar os dados em texto json
        .then((data) => data)                                                      // Vai retornar os dados num array de objetos
        .catch((err) => console.log(err))                                          // me dá um erro caso haja alguma coisa na requisição
              
        setLoading(false)                                                          // pra parar de carregar 
         
        setTodos(res)
        console.log(res)
      }
      
   
      loadData()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();                                                             //Impede que a página recarrege ao clicar o botão
  
    const todo = {
      id: Math.random(),                                                            // Cria um id artificial
      title,
      time,
      done: false,                                                                  // A tarefa entra como não completa no sistema
    }
    
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),                                                  // Só se pode comunicar via texto, pra converter em um objeto
      headers:{
        "Content-Type": "application/json",
      }
    })
    // Envio para a api
    //console.log();
    
    setTitle("")
    setTime("")
  }

  return (
    <div className="app">
      <div className="todo-header">
        <h1>React Todo</h1>      
      </div>    

      <div className="form-todo">
        <h2>Informe a sua próxima tarefa</h2> 
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer ?</label>
            <input type="text" 
              name="title" 
              placeholder="Título da tarefa" 
              onChange={(e) => setTitle(e.target.value)} 
              value={title || ""} 
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="time">Duração:</label>
            <input type="text" 
              name="time" 
              placeholder="Tempo estimado (em horas)" 
              onChange={(e) => setTime(e.target.value)} 
              value={time || ""} 
              required
            />
          </div>

          <input type="submit" value="Criar Tarefa" />
        </form>
      </div>

      <div className="list-todo">
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <p>{todo.title}</p>
          </div>
        ))}
      </div>
    </div> 
  );
}

export default App;
