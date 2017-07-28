import * as React from 'react';
import {render} from 'react-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import todos from './todos';
import Head from '../components/Header';
import Todo from '../components/Todo';
import Form from '../components/Form'

class Main extends React.Component<IMProp, IMState>{
    constructor(props: any){
        super(props);

        this.state = {
            todos: []
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/todos')
            .then((response: any) => response.data)
            .then((todos: any) => this.setState({ todos }))
            .catch(this.handleError)
    }

    handleStatusChange (id: any) {
        axios.patch(`/api/todos/${id}`)
            .then(response => {
                let todos = this.state.todos.map((todo: Itodo) => {
                    if (todo.id === id){
                        todo = response.data;
                    }

                    return todo;
                });

                this.setState({ todos });
            })
            .catch(this.handleError)

    }

    handleAdd (title: string){
        axios.post('/api/todos', { title })
            .then(response => response.data)
            .then(todo => {
                let todos = [...this.state.todos, todo];
                this.setState({ todos });
            })
            .catch(this.handleError)
    }

    handleError(error: any){
        console.error(error);
    }

    handleEdit(id: any, title: any){
        axios.put(`/api/todos/${id}`, { title })
            .then(response => {
            let todos = this.state.todos.map((todo: Itodo) => {
                if(todo.id === id) {
                    todo = response.data;
                }
                return todo;
            });
            this.setState({ todos });
            })
        .catch(this.handleError)
    }

    handleDelete (id: any) {
        axios.delete(`/api/todos/${id}`)
            .then(() => {
                let todos = this.state.todos.filter((todo: Itodo) => todo.id !== id);
                this.setState({ todos });
            })
            .catch(this.handleError)
    }
    
    public render() {
        return (
            <main> 
                <Head text = "Список задач" 
                todos = {this.state.todos}/>
                <ReactCSSTransitionGroup 
                    component = "section" 
                    className = "list-todo"
                    transitionName = "slide"
                    transitionAppear = {true}
                    transitionAppearTimeout = {500}
                    transitionEnterTimeout = {500}
                    transitionLeaveTimeout = {500}>
                   
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

                </ReactCSSTransitionGroup>

                <Form onAdd = {this.handleAdd}/>

            </main>
        )
    }
}

render(<Main initialData = {todos}/>, document.getElementById('root'));