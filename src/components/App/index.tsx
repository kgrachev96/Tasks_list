import * as React from 'react';
import {render} from 'react-dom';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import todos from '../../todos';
import Head from '../Header';
import Todo from '../Todo';
import Form from '../Form';
import Search from '../Search';

export default class App extends React.Component<IMProp, IMState>{
    constructor(props: any){
        super(props);

        this.state = {
            todos: [],
            filteredTodos: []
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.filterBy = this.filterBy.bind(this);
    }

    componentDidMount() {
        axios.get('/api/todos')
            .then((response: any) => response.data)
            .then((todos: any) => this.setState({todos, filteredTodos: todos}))
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


    filterBy(field: any, value: any) {
        if (value != "") {
            let filteredTodos = this.state.todos.filter((todo: Itodo) => todo[field].includes(value))
            this.setState({ filteredTodos });
        }
        else { 
            this.setState({filteredTodos: this.state.todos});
        }
    }
    
    
    public render() {
        
        return (
            
            <main> 
                <Search filterBy = {this.filterBy}/>
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
                    {this.state.filteredTodos.map((todo: Itodo) => (
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