import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
// daum map
import MapModal from './MapModal';
import './Table.css';

const options = {
    noDataText: ' '
};
class AddressList extends Component{
    static defaultProps={
        csv:"",
        gungu:"",
        list:[]
    }
    
    shouldComponentUpdate(nextProps, nextState) { // App리렌더링에 따른 PhoneList리렌더링 막음  / 불변성 지킬 것
        console.log("AddressList shouldComponentUpdate list check")
        return nextProps.list !== this.props.list;  // 다음에 받아올 data가 현재 data와 다를 배열일 때 true
        //return true
    }
    //"sido","sigun","dong","구주소본번","구주소부번","street","새주소본번","새주소부번","건물명","상세건물명","X좌표","Y좌표"
    //"시도명칭","시군구명칭","읍면동명칭","구주소본번","구주소부번","도로명칭","새주소본번","새주소부번","건물명","상세건물명","X좌표","Y좌표"
    showModal = (cell, row) => {
        //console.log(row);
        return <MapModal info = {{...row}} key={row}/>
    }
    
    render(){
        let list = this.props.list.filter(li => li.sigun === this.props.gungu);
        if (this.props.gungu===""){
            list = [];
        }
        return(
            <div>
                <h4>{this.props.gungu} {this.props.list.dong}</h4>
                {/* 
                <Table striped bordered hover responsive="lg">
                    <thead>
                        <tr>
                            <td>시도</td><td>시군구</td><td>읍면동</td><td>도로명</td><td>본번</td>
                            <td>부번</td><td>건물명</td><td>상세건물명</td><td>위치</td>
                        </tr>
                    </thead>
                    <tbody className="table_content">
                        {list.map((value, i) =>
                            <tr key={i}>
                                <td>{value.sido}</td>
                                <td>{value.sigun}</td>
                                <td>{value.dong}</td>
                                <td>{value.street}</td>
                                <td>{value.새주소본번}</td>
                                <td>{value.새주소부번 === '0' ? '' : value.새주소부번}</td> 
                                <td>{value.건물명}</td>
                                <td>{value.상세건물명}</td> 
                                <td><MapModal info = {{...value}} key={i}/></td>  
                            </tr>
                        )}
                        
                    </tbody>
                </Table>
                */}
                <BootstrapTable ref='table' data={ list } options={options}>
                    {/*<TableHeaderColumn dataField='sido' isKey={ true } dataSort={ true }>시도</TableHeaderColumn> */}
                    <TableHeaderColumn dataField='sido' dataAlign='center' headerAlign="center" width="10%">시도</TableHeaderColumn>
                    <TableHeaderColumn dataField='sigun' dataAlign='center' headerAlign="center" width="10%" >시군구</TableHeaderColumn>
                    <TableHeaderColumn dataField='dong'dataAlign='center' headerAlign="center" width="10%">읍면동</TableHeaderColumn>
                    <TableHeaderColumn dataField='street'dataAlign='center' headerAlign="center" width="10%">거리명</TableHeaderColumn>
                    <TableHeaderColumn dataField='새주소본번' dataAlign='center' headerAlign="center" width="10%" isKey={ true } dataSort>본번<UnfoldMoreIcon/></TableHeaderColumn>
                    <TableHeaderColumn dataField='새주소부번' dataAlign='center' headerAlign="center" width="5%">부번</TableHeaderColumn>
                    <TableHeaderColumn dataField='건물명' dataAlign='center' headerAlign="center" width="15%">건물명</TableHeaderColumn>
                    <TableHeaderColumn dataField='상세건물명' dataAlign='center' headerAlign="center" width="15%">상세건물명</TableHeaderColumn>
                    <TableHeaderColumn dataField='location' dataAlign='center' headerAlign="center" width="15%" dataFormat={this.showModal}>위치</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
        //"sido","sigun","dong","구주소본번","구주소부번","street","새주소본번","새주소부번","건물명","상세건물명","X좌표","Y좌표"

    }
}

export default AddressList;