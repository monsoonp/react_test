import React, {Component} from 'react';
import {TreeView,TreeItem} from '@material-ui/lab';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class SidoTree extends Component{
    static defaultProps={
        address:[],
    
    }
    state = {
        street:"",
    }
    changeStreet = (e) => {
        const {onStreet} = this.props;
        onStreet(e.target.innerText);
        this.setState({
            street:e.target.innerText
        })
        /*
        this.setState({
            street: e.target.innerText
        })
        */
        //console.log(e.target.innerText);
    }
    bindList = (e) => {
        //const {label} = e.target;
        this.setState({
            street: e.target.innerText
        })
        console.log("tree label: %s",e.target.innerText);
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("SidoTree componentDidMount")
        // return false 하면 업데이트를 안함
        return nextProps.address !== this.props.address
        //return true;
    }
    render(){
        //"시도명칭",       "시군구명칭",   "읍면동명칭",       "도로명칭",         "새주소본번","새주소부번"
        // {sido:"서울특별시", sigun:"종로구", dong:"명륜2가", street:"성균관로", mainNum:"17",subNum:"0"},
        const {address} = this.props; //default list
        let dong = address.filter( (item, index, self) => index === self.findIndex( itm => itm.dong === item.dong)); // sorted list 동 중복 없이
        //dong = dong.filter( (item, index, self) => index === self.findIndex(itm => itm.street === item.street)); // sorted list 거리명 중복 없이
        
        //console.log(address);
        //console.log(dong);
        return(
            <div>
                {dong.map( (adr, i) => {
                    return(
                        <TreeItem key={i} nodeId={this.props.gu+""+i} label={adr.dong}>
                            
                            {(address.filter( (item) => item.dong === adr.dong )).
                                filter( (item, index, self) => index === self.findIndex(itm => itm.street === item.street) ).
                                    map( (value,idx) => {
                                
                                return(
                                    
                                    <TreeItem key={i+"-"+idx} nodeId={this.props.gu+""+i+"-"+idx} label={value.street} onClick={this.changeStreet}>
                                    </TreeItem>
                                )
                            })}
                        </TreeItem>
                        
                    )
                })}
                
               

            </div>
        );
        
    }
}

export default SidoTree;