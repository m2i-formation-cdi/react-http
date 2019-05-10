import React from 'react';
import axios from 'axios';

const URL = 'http://jsonplaceholder.typicode.com/todos';

function TodoList(props){

   const tableRows = props.data.map(
      (task)=>{
         return(
            <tr key={task.id}>
               <td>{task.id}</td>
               <td>{task.title}</td>
               <td>{task.completed? 'OUI': 'NON'}</td>
            </tr>
         );
      }
   );

   console.log(props.data);

   return(
      <table className="table table-bordered table-striped">
         <thead>
            <tr>
               <th>id</th>
               <th>tâche</th>
               <th>Fait</th>
            </tr>
         </thead>
         <tbody>
            {tableRows}
         </tbody>
      </table>
   );
}

class Todo extends React.Component{

   state = {
      todoList: []
   }

   //Appel asynchrone avec la bibliothèque Axios
   constructor(props){
      super(props);

      axios.get(URL).then(
         (response)=> {
            console.log(response.data);
            this.setState({todoList: response.data});
         }
      );

      console.log(this.props);
    }
  
   render(){
      return (
         <div>
            <h1>Liste des tâches</h1>
            {/* Ici un commentaire */}
            <TodoList data={this.state.todoList.slice(0,10)}/>
         </div>
      );
   }
   
}

export default Todo;
   