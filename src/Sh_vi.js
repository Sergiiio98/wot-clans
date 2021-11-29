import React, { Component } from 'react';
import './Sh_vi.css'
import axios from 'axios';
import Clan from './Clan';
const API_URL = "https://api.worldoftanks.eu/wot/clanratings/top/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&rank_field=fort_elo_rating_6&limit=100";

class Sh_vi extends Component {
    constructor(props){
        super(props);
     
        this.state = {
            data: [],
            clanIdList: [],
            clanData: [],
            clanData2: [],
            isLoading: true,
        }

        this.generateData = this.generateData.bind(this);

    }

    fetchClans = async (arr) => {
        let clans = [];
        await Promise.all(
            arr.map(async (el) => {
                const res = await axios.get(
                    `https://api.worldoftanks.eu/wot/clans/info/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&clan_id=${el}`
                );
                clans.push(res.data.data[el]);
            })
        );
        console.log(clans);
        return clans;
    };

    fetchClans2 = async (arr) => {
        let clans2 = [];
        await Promise.all(
            arr.map(async (el) => {
                const res = await axios.get(
                    `https://api.worldoftanks.eu/wot/stronghold/claninfo/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&clan_id=${el}`
                );
                clans2.push(res.data.data[el]);
            })
        );
        console.log(clans2);
        return clans2;
    };

    



    async componentDidMount(){

        const res = await axios.get(API_URL);
        let pArr = res.data.data;

        const dataArr = pArr.map((el) => {
            return el.clan_id;
            });

        const clans = await this.fetchClans(dataArr);
        const clans2 = await this.fetchClans2(dataArr);

        this.setState({data: res.data.data , clanData: clans, isLoading: false, clanData2: clans2, clanIdList: dataArr  })

    }


    
    generateData(){
        let clanData2 = [];
        const clans = this.state.data.map((el, idx) => {
            return clanData2[idx] = { clanTag: el.clan_tag, clanRank : idx, clanElo: el.fb_elo_rating_6.value,}
        });

        const dataArr = this.state.clanIdList.map((el, idx) => {
            return clanData2[idx] = {...clanData2[idx], clanId: el}
            });


        const dataArr2 = this.state.clanData.map((el, idx) => {
            return clanData2[idx] = {...clanData2[idx], clanColor: el.color, clanLogo: el.emblems.x195.portal}
            });

        const dataArr3 = this.state.clanData2.map((el, idx) => {
                return clanData2[idx] = {...clanData2[idx], clanBattles: el.skirmish_statistics.total_6_in_28d, shWins: el.skirmish_statistics.win_6_in_28d}
        });

      

       return clanData2;
    }


    render() {

        let data = this.generateData();
        console.log(data);

        function apiInfo(){
            return (
            <div>
                <h5 style={{color:'white'}}>due to API overload estimated loading time is about 10-20 sec</h5>
            </div>
            )
        }

        const clans = data.map((el, idx) => {
            return <Clan clanName={el.clanTag} clanRank={idx+1} clanElo={el.clanElo} logo={el.clanLogo} color={el.clanColor} clanBattles={el.clanBattles} clanWinrate={(Math.round((el.shWins)/(el.clanBattles)*100)/100)*100}   />;
        });

        if(this.state.isLoading === true){
            return(
                <div>
                <div className="loadbox">
                    <div class="loader"></div>
                </div>
                {apiInfo()}
                </div>
               
            )
        }
        
        return (
            <div className="mainBox">
               
            
                {clans}
                
                
            </div>
          );
    }
}
 
export default Sh_vi;

