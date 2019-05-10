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
      todoList: [],
      numberOfPages : 0
   }

   currentPage = 1;

   numberOfItemsPerPage = 10;

   //Appel asynchrone avec la bibliothèque Axios
   constructor(props){
      super(props);

      axios.get(URL).then(
         (response)=> {
            console.log(response.data);
            let state = {
               todoList : response.data,
               numberOfPages: Math.ceil(response.data.length/this.numberOfItemsPerPage)
            }
            this.setState(state);

         }
      );

      let values = queryString.parse(this.props.location.search);
      this.currentPage = values.page || 1;
      
    }
  
   render(){
      return (
         <div>
            <h1>Liste des tâches</h1>
            {/* Ici un commentaire */}
            <TodoList data={this.state.todoList.slice((this.currentPage-1)* this.numberOfItemsPerPage,this.currentPage*this.numberOfItemsPerPage)}/>

            <Pagination 
               numberOfPages={this.state.numberOfPages}
               currentPage={this.currentPage}/>
         </div>
      );
   }
   
}

function Pagination(props){
   let pages = Array(props.numberOfPages).fill(0);

   const buttons = pages.map(
      (item, index)=>{
         let pageNumber = index +1;

         let pageClasses = "page-item ";
         if(props.currentPage == pageNumber){
            pageClasses += "active";
         }
         return (
            <li key={index} className={pageClasses}>
               <a className="page-link" href={"/todo?page=" + pageNumber}>
                  {pageNumber}
               </a>
            </li>
         );
      }
   );

   const nextLink = "/todo?page=" + ( props.currentPage==props.numberOfPages?props.currentPage:parseInt(props.currentPage)+1);

   const nextButton = (
      <li className="page-item">
         <a className="page-link"
         href={nextLink}
         >suivant</a>
      </li>
   );

   const prevLink = "/todo?page=" +
   (props.currentPage ==1?1: props.currentPage-1)
   const prevButton = (
      <li className="page-item">
         <a className="page-link"
         href={prevLink}
         >
            Précédent
         </a>
      </li>
   );

   console.log(buttons);

   return (
      <ul className="pagination pagination-sm flex-sm-wrap">
         {prevButton}
         {buttons}
         {nextButton}
      </ul>
   );
}

export default Todo;
   