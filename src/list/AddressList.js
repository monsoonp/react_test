import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
// daum map
import MapModal from './MapModal';

class AddressList extends Component{
    static defaultProps={
        csv:"",
        gungu:"",
        list:[]
    }
    
    shouldComponentUpdate(nextProps, nextState) { // App리렌더링에 따른 PhoneList리렌더링 막음  / 불변성 지킬 것
        return nextProps.list !== this.props.list;  // 다음에 받아올 data가 현재 data와 다를 배열일 때 true
        //return true
    }
    //"sido","sigun","dong","구주소본번","구주소부번","street","새주소본번","새주소부번","건물명","상세건물명","X좌표","Y좌표"
    //"시도명칭","시군구명칭","읍면동명칭","구주소본번","구주소부번","도로명칭","새주소본번","새주소부번","건물명","상세건물명","X좌표","Y좌표"
    render(){
        let list = this.props.list.filter(li => li.sigun === this.props.gungu);
        if (this.props.gungu===""){
            list = [];
        }
        console.log("3-1 gungu: %s",list);
        return(
            <div>
                <h4>{this.props.gungu} {this.props.list.dong}</h4>
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
            </div>
        );
    }
}

export default AddressList;