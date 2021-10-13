import React, { Component } from 'react';
import axios from 'axios';
import Clan from './Clan';


class Sh_vi extends Component {
    constructor(props){
        super(props);
     
        this.state = {
            data: []
        }

        this.generateData = this.generateData.bind(this);
    }

    componentDidMount(){
        axios.get("https://api.worldoftanks.eu/wot/clanratings/top/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&rank_field=fort_elo_rating_6&limit=100").then(res => {
            // console.log(res.data.data);
            this.setState({data: res.data.data})
        })
    }
    
    generateData(){
       
        
    }

    render() {

        const clans = this.state.data.map((el, idx) => {
            return <Clan clanName={el.clan_tag} clanRank={idx} clanElo={el.fb_elo_rating_6.value}/>;
        });
        return (
            <div>
                <h1>Klasyfikacja klanu pod względem Elo</h1>
                {clans}
            </div>
          );
    }
}
 
export default Sh_vi;

