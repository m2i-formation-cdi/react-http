import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

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

   currentPage = 1;

   numberOfItemsPerPage = 10;

   numberOfPages;

   //Appel asynchrone avec la bibliothèque Axios
   constructor(props){
      super(props);

      axios.get(URL).then(
         (response)=> {
            console.log(response.data);
            this.setState({todoList: response.data});
            this.numberOfPages = Math.ceil(response.data.length/this.numberOfItemsPerPage);
         }
      );

      let values = queryString.parse(this.props.location.search);
      this.currentPage = values.page;
      
    }
  
   render(){
      return (
         <div>
            <h1>Liste des tâches</h1>
            {/* Ici un commentaire */}
            <TodoList data={this.state.todoList.slice((this.currentPage-1)* this.numberOfItemsPerPage,this.currentPage*this.numberOfItemsPerPage)}/>
         </div>
      );
   }
   
}

export default Todo;
   