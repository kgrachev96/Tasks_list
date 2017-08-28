import * as React from 'react';


export default class Search extends React.Component<any, any> {
    constructor(props: any){
        super(props);

        this.state = {
            search_todo: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any){
        let search_todo = event.target.value;
        this.setState( { search_todo } )
            if(search_todo){
                this.props.filterBy("title", search_todo);
            }
          
    }

    render() {
        return(
            <form className = "search">
                <input
                    className = "search_todo"
                    type = "text"
                    value = {this.state.search_todo}
                    placeholder = 'Что нужно найти?'
                    onChange = {this.handleChange}
                />
            </form>
        );
    }
}