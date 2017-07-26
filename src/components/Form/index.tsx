import * as React from 'react';

import Button from '../Button/index'

export default class Form extends React.Component<any, any>{

    constructor(props: any){
        super(props);

        this.state = {
            title: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();
        let title = this.state.title;

        if(title){
            this.props.onAdd(title);
            this.setState({ title: '' })

        }
    }

    handleChange(event: any){
        let title = event.target.value;

        this.setState({title})
    }


    public render() {
        return (
            <form className = "todo-form" onSubmit = {this.handleSubmit}> 

                <input 
                type = "text" 
                value = {this.state.title} 
                placeholder = "Что нужно сделать?"
                onChange = {this.handleChange} 
                />
                
                <Button type = "submit"> Добавить </Button>


            </form>
        )
    }
}