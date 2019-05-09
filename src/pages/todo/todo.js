import React from 'react';
import axios from 'axios';

const URL = 'http://jsonplaceholder.typicode.com/todos';

function TodoList(props){

   const tableRows = props.data.map(
      (task)=>{
         return(
            <tr>
               <td>{task.title}</td>
               <td>{task.completed? 'OUI': 'NON'}</td>
            </tr>
         );
      }
   );

   console.log(props.data);

   return(
      <table>
         <thead>
            <tr>
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
   constructor(){
      super();

      axios.get(URL).then(
         (response)=> {
            console.log(response.data);
            this.setState({todoList: response.data});
         }
      );
      
   }
  
   render(){
      return (
         <div>
            <h1>Liste des tâches</h1>
            {/* Ici un commentaire */}
            <TodoList data={this.state.todoList}/>
         </div>
      );
   }
   
}

export default Todo;
   