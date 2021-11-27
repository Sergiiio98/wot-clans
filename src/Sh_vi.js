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
            clanes: [],
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



    async componentDidMount(){

        const res = await axios.get(API_URL);
        let pArr = res.data.data;

        const dataArr = pArr.map((el) => {
            return el.clan_id;
            });

        const clans = await this.fetchClans(dataArr);

       

                // let clanInfo = [];
                // const clanArr = idList.map(async (el, idx) =>{
                //     await axios.get(`https://api.worldoftanks.eu/wot/clans/info/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&clan_id=${el}`).then(res =>{
                //     clanInfo[idx] = {logo: res.data.data[el].emblems.x195.portal, color: res.data.data[el].color };
                //     })
                // })

       
        // console.log(test);

            
        this.setState({data: res.data.data , clanData: clans  })

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
            return clanData2[idx] = {...clanData2[idx], clanColor: el.color, clanLogo: el.emblems.x195.portal}
            });

       return clanData2;
    }


    render() {

        let data = this.generateData();
        console.log(data);

        const clans = data.map((el, idx) => {
            return <Clan clanName={el.clanTag} clanRank={idx+1} clanElo={el.clanElo} logo={el.clanLogo} color={el.clanColor}   />;
        });

        // if(this.state.isLoading === true){
        //     return(
        //     <div>
        //         <span className="load"></span>
        //     </div>
        //     )
        // }
        
        return (
            <div>
               
            
                {clans}
                
                
            </div>
          );
    }
}
 
export default Sh_vi;

