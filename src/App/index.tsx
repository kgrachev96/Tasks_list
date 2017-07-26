import * as React from 'react';
import {render} from 'react-dom';

import todos from './todos';
import Head from '../components/Header';
import Todo from '../components/Todo';
import Form from '../components/Form'

class Main extends React.Component<IMProp, IMState>{
    constructor(props: any){
        super(props);

        this.state = {
            todos: this.props.initialData
        };
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    // nextId(){
    //     this._nextId = this._nextId || 4;
    //     return this._nextId++;
    // }

    handleStatusChange (id: any) {
        let todos = this.state.todos.map((todo: Itodo) => {
            if (todo.id === id){
                todo.completed = !todo.completed;
            }

            return todo;
        });

        this.setState({ todos });
    }

    handleAdd (title: string){
        let todo = {
            id: this.state.todos.length + 1,
            title,
            completed: false
        };

        let todos = [...this.state.todos, todo];

        this.setState({ todos });
    }

    handleEdit(id: any, title: any){
    let todos = this.state.todos.map((todo: Itodo) => {
        if(todo.id === id) {
            todo.title = title;
        }
        return todo;
    });
    this.setState({ todos });
    }

    handleDelete (id: any) {
        let todos = this.state.todos.filter((todo: Itodo) => todo.id !== id);

        this.setState({ todos });
    }
    
    public render() {
        return (
            <main> 
                
                <Head text = "Список задач" todos = {this.state.todos}/>
                
                <section className = "list-todo">
                    {this.state.todos.map((todo: Itodo) => (
                        <Todo 
                        key = {todo.id}
                        id = {todo.id} 
                        title = {todo.title} 
                        completed = {todo.completed}
                        onStatusChange = {this.handleStatusChange} 
                        onDelete = {this.handleDelete} 
                        onEdit = {this.handleEdit}  
                    />
                    ))}

                </section>

                <Form onAdd = {this.handleAdd}/>

            </main>
        )
    }
}

render(<Main initialData = {todos}/>, document.getElementById('root'));