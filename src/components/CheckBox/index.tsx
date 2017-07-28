import * as React from 'react';

export default class CheckBox extends React.Component<ICProp, ICState> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className = "checkbox icon" onClick = {this.props.onChange} >
                <i className = "material-icons">{this.props.checked ? 'check_box' : 
                    'check_box_outline_blank'}</i>
            </button>
        )
    }
}