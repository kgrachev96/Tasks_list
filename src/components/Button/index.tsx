import * as React from 'react';

export default class Button extends React.Component<IBProp, any> {
    public render() {
        return (
            <button 
            className = {this.props.className} 
            onClick = {this.props.onClick} 
            {...this.props}>
                {
                    this.props.icon ?
                    <i className = "material-icons">{this.props.icon}</i>
                    :
                    this.props.children
                }
                
            </button>
        )
    }
}