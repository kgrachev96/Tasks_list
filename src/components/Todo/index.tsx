import * as React from 'react';

import CheckBox from '../CheckBox';
import Button from '../Button';

export default class Todo extends React.Component<IProp, any> {
        
    constructor(props: any){
        super(props);

        this.state = {
            editing: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidUpdate(prevProp: any, prevState: any){
        if (this.state.editing){
            this.title.focus();
            this.title.select();
        }
    }

    handleSubmit(event: any){
        event.preventDefault();
        let title = this.title.value;
        this.props.onEdit(this.props.id, title);
        this.setState({ editing: false })
    }

    // maxLength() {
    //     if(this.title.value.length> 10){
    //         this.title.value = "kek";
    //     }
    // }


    renderDisplay(){
        return (
        <div className = {`todo ${this.props.completed ? ' completed' : ''}`}>
            <CheckBox checked = {this.props.completed} 
            onChange = {() => this.props.onStatusChange(this.props.id)}/>

            <span className = "title">{this.props.title}</span>
            <Button className = "edit icon" icon = "edit" 
            onClick = {() => this.setState({ editing: true })}/>
            <Button className = "delete icon" icon = "delete" 
            onClick = {() => this.props.onDelete(this.props.id)}/>
        </div>
        )
    }

    title: HTMLInputElement;

    renderForm(){
        return (
        <form className = "todo-edit-form" onSubmit = {this.handleSubmit}>  
                <input 
                    type = "text"
                    ref = {(elem: any) => this.title = elem}
                    defaultValue = {this.props.title}
                    onBlur = {() => this.setState({editing: false})}
                    
                />
            <Button className = "save icon" icon = "save" type = "submit"/>
        </form>
        )
    }

    render() {
        return this.state.editing ? this.renderForm() : this.renderDisplay();
    }
}