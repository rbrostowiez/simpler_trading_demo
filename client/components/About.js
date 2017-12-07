import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReadMeStore from '../stores/ReadMeStore';
import ReadmeActions from "../actions/ReadMeActions";

export default class About extends React.Component {

    constructor(){
        super();

        this.onReadMeStoreChange = () =>{
            this.setState(ReadMeStore.getReadMe());
        };

        ReadmeActions.getReadme();

        this.state = ReadMeStore.getReadMe();
    }

    componentWillMount(){
        ReadMeStore.on('change', this.onReadMeStoreChange);
    }

    componentWillUnmount(){
        ReadMeStore.removeListener('change', this.onReadMeStoreChange);
    }

    render(){
        if(!this.state){
            return (<div className="alert alert-danger">Loading!</div>)
        }
        return (
            <div className="about container-fluid">
                <div className="card bg-light mb-3">
                    <div className="card-body">
                        <ReactMarkdown source={this.state.text} />
                    </div>
                </div>
            </div>
        );
    }
}
