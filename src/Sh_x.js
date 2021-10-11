import React, { Component } from 'react';
import axios from 'axios';


class Sh_x extends Component {
    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        axios.get("https://api.worldoftanks.eu/wot/clans/list/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5").then(res => {
            console.log(res);
        })
        
    }
    
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
            </div>
          );
    }
}
 
export default Sh_x;

