import * as React from 'react';

import Stats from '../Stats/index';

export default class Head extends React.Component<IHProp, any> {
    public render() {
        return (
            <header>
                <Stats todos = {this.props.todos}/> 
                <h1>{this.props.text}</h1>
            </header>
        )
    }
}
