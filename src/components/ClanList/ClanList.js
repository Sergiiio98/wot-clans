import React, { Component } from 'react';
import './ClanList.css'
import axios from 'axios';
import Clan from '../Clan/Clan';
import InfiniteScroll from 'react-infinite-scroller';

class Sh_vi extends Component {
    constructor(props){
        super(props);
        // Tier props
        // 0 represents VI tier
        // 1 == VIII tier
        // 2 == X tier
        this.state = {
            clans: [],
            data: [],
            clanIdList: [],
            clanData: [],
            clanData2: [],
            isLoading: true,
            counter: 0,
            hasMore: true,
        }
        this.generateData = this.generateData.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    fetchClans = async (arr) => {
        let clans = [];
        for (const item of arr) {
            const res = await axios.get(
                `https://api.worldoftanks.eu/wot/clans/info/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&clan_id=${item}`
            );
            clans.push(res.data.data[item]);
        }
        return clans;
    };

    fetchClans2 = async (arr) => {
        let clans2 = [];
        for (const item of arr) {
            const res = await axios.get(
                `https://api.worldoftanks.eu/wot/stronghold/claninfo/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&clan_id=${item}`
                );
            clans2.push(res.data.data[item]);
        }
        return clans2;
    };

    
    async loadData(page){
        const TierUrl = [
            `https://api.worldoftanks.eu/wot/clanratings/top/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&rank_field=fort_elo_rating_6&page_no=${page}&limit=10`,
            `https://api.worldoftanks.eu/wot/clanratings/top/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&rank_field=fort_elo_rating_8&page_no=${page}&limit=10`,
            `https://api.worldoftanks.eu/wot/clanratings/top/?application_id=f8ffb59743e6046de8f37f8d0daf6dc5&rank_field=fort_elo_rating_10&page_no=${page}&limit=10`
        ]

        let url = TierUrl[this.props.tierState];
        const res = await axios.get(url);
        let pArr = res.data.data;

        const dataArr = pArr.map((el) => {
            return el.clan_id;
            });

        const clans = await this.fetchClans(dataArr);
        const clans2 = await this.fetchClans2(dataArr);

       this.setState({data: res.data.data , clanData: clans, isLoading: false, clanData2: clans2, clanIdList: dataArr  })
       this.renderData(this.props.tierState);
    }

    renderData(number=0){
        let data = this.generateData(number);
        let clans = data.map((el, idx) => {
            this.setState({counter: this.state.counter + 1});
            return <Clan clanName={el.clanTag} clanRank={this.state.counter} clanElo={el.clanElo} logo={el.clanLogo} color={el.clanColor} clanBattles={el.clanBattles} clanWinrate={(Math.round((el.shWins)/(el.clanBattles)*100)/100)*100}   />;
        });
        this.setState({clans: [...this.state.clans, clans] });     
    }

    async componentDidMount(){
        await this.loadData(1,this.props.tierState);
    }

    generateData(number){
        let clanData2 = [];

        if(number === 0){
            this.state.data.map((el, idx) => {
                return clanData2[idx] = { clanTag: el.clan_tag, clanRank : idx, clanElo: el.fb_elo_rating_6.value,}
            });
        }
        if(number === 1){
            this.state.data.map((el, idx) => {
                return clanData2[idx] = { clanTag: el.clan_tag, clanRank : idx, clanElo: el.fb_elo_rating_8.value,}
            });
        }
        if(number === 2){
            this.state.data.map((el, idx) => {
                return clanData2[idx] = { clanTag: el.clan_tag, clanRank : idx, clanElo: el.fb_elo_rating_10.value,}
            });
        }
        

        this.state.clanIdList.map((el, idx) => {
            return clanData2[idx] = {...clanData2[idx], clanId: el}
            });


        this.state.clanData.map((el, idx) => {
            return clanData2[idx] = {...clanData2[idx], clanColor: el.color, clanLogo: el.emblems.x195.portal}
            });

            if(number === 0){
                this.state.clanData2.map((el, idx) => {
                    return clanData2[idx] = {...clanData2[idx], clanBattles: el.skirmish_statistics.total_6_in_28d, shWins: el.skirmish_statistics.win_6_in_28d}
            });

            }
            if(number === 1){
                this.state.clanData2.map((el, idx) => {
                    return clanData2[idx] = {...clanData2[idx], clanBattles: el.skirmish_statistics.total_8_in_28d, shWins: el.skirmish_statistics.win_8_in_28d}
            });

            }
            if(number === 2){
                this.state.clanData2.map((el, idx) => {
                    return clanData2[idx] = {...clanData2[idx], clanBattles: el.skirmish_statistics.total_10_in_28d, shWins: el.skirmish_statistics.win_10_in_28d}
            });
            }
       return clanData2;
    }

    render() {
        function apiInfo(){
            return (
            <div>
                {/* <h5 style={{color:'white'}}>due to API overload estimated loading time is about 10-20 sec</h5> */}
            </div>
            )
        }

        if(this.state.isLoading === true){
            return(
                <div>
                <div className="loadbox">
                    <div className="loader"></div>
                </div>
                {apiInfo()}
                </div>
            )
        }
        
        return (
            <div>
                <div className="mainBox">
                
                    <div style={{height: "700px" ,overflow:"auto"}} ref={(ref) => this.scrollParentRef = ref}>
                        <div>
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={this.loadData}
                            hasMore={this.state.hasMore}
                            useWindow={false}
                            getScrollParent={() => this.scrollParentRef}
                            loader={<div style={{color: 'white'}} className="loader2" key={0}>Loading...</div>}>
                            {this.state.clans}
                        </InfiniteScroll>
                        </div>
                    </div>                    
                </div>
            </div>
          );
    }
}
 
export default Sh_vi;

