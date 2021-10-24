import React, { Component } from 'react';
import axios from 'axios';
import Clan from './Clan';


class Sh_vi extends Component {
    constructor(props){
        super(props);
     
        this.state = {
            data: [],
            clanIdList: [],
            clanData: [],
            clanDataF: [],
        }

        this.generateData = this.generateData.bind(this);
    }

    componentDidMount(){
        axios.get("https://api.worldoftanks.eu/wot/clanratings/top/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&rank_field=fort_elo_rating_6&limit=100").then(res => {
            // console.log(res.data.data);
            let idList = [];
            const dataArr = res.data.data.map((el, idx) => {
                idList[idx] = el.clan_id;
                });
                let clanInfo = [];

                const clanArr = idList.map((el, idx) =>{
                    axios.get(`https://api.worldoftanks.eu/wot/clans/info/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&clan_id=${el}`).then(res =>{
                      clanInfo[idx] = {logo: res.data.data[el].emblems.x195.portal, color: res.data.data[el].color };
                    //   console.log(res.data.data[el].emblems.x195.portal);
                    //   console.log(res.data.data[el].color);
                    })
                })

               
            this.setState({data: res.data.data, clanIdList: idList, clanData: clanInfo })
        }) 
    }

    
    generateData(){




        let clanData2 = [];
        const clans = this.state.data.map((el, idx) => {
            return clanData2[idx] = { clanTag: el.clan_tag, clanRank : idx, clanElo: el.fb_elo_rating_6.value}
        });

        const dataArr = this.state.clanIdList.map((el, idx) => {
            return clanData2[idx] = {...clanData2[idx], clanId: el}
            });


        const dataArr2 = this.state.clanData.map((el, idx) => {
            return clanData2[idx] = {...clanData2[idx], clanColor: el[idx].color, clanLogo: el[idx].logo}
            });



       return clanData2;
    }

    render() {
        let data = this.generateData();
        let data2 = this.state.clanData;
        
        const clans = data.map((el, idx) => {
            return <Clan clanName={el.clanTag} clanRank={idx} clanElo={el.clanElo}   />;
        });
        console.log(data2);
        return (
            <div>
                <h1>Klasyfikacja klanu pod względem Elo</h1>
                {clans}
                
                
            </div>
          );
    }
}
 
export default Sh_vi;

