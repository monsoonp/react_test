import React, {Component} from 'react';
import SidoTree from './list/SidoTree';
import AddressList from './list/AddressList';
//import logo from './logo.svg';
import './App.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import Button from '@material-ui/core/Button';
import { TreeView, TreeItem} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ButtonToolbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
//import { CsvToHtmlTable } from 'react-csv-to-table';
import csvFile from './data/total.csv';
import * as d3 from 'd3';

const styles  = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
const addressList = {
  width: '80%',
  margin: 'auto'
}
const rowStyle={
  minHeight: '50vh' 
}
    
class Main extends Component{
  //"시도명칭","시군구명칭","읍면동명칭","도로명칭","새주소본번","새주소부번"
  state = {
    address:[
      /*
      {id:1, sido:"서울특별시", sigun:"종로구", dong:"명륜2가", street:"성균관로", mainNum:"17",subNum:"0"},
      {id:2, sido:"서울특별시", sigun:"종로구", dong:"명륜1가", street:"성균관로", mainNum:"38",subNum:"12"},
      {id:3, sido:"서울특별시", sigun:"종로구", dong:"와룡동", street:"율곡로", mainNum:"99",subNum:"0"},
      {id:4, sido:"서울특별시", sigun:"종로구", dong:"행촌동", street:"통일로12길", mainNum:"80",subNum:"0"},
      {id:5, sido:"서울특별시", sigun:"종로구", dong:"행촌동", street:"통일로12길", mainNum:"30",subNum:"25"},
      {id:6, sido:"서울특별시", sigun:"중랑구", dong:"면목동", street:"면목로30길", mainNum:"19",subNum:"30"},
      {id:7, sido:"서울특별시", sigun:"중랑구", dong:"면목동", street:"면목로28길", mainNum:"27",subNum:"0"},
      {id:8, sido:"서울특별시", sigun:"중랑구", dong:"면목동", street:"면목로27길", mainNum:"77",subNum:"9"},
      {id:9, sido:"서울특별시", sigun:"중랑구", dong:"면목동", street:"면목로24길", mainNum:"17",subNum:"1"},
      {id:10, sido:"서울특별시", sigun:"중랑구", dong:"망우동", street:"망우로91길", mainNum:"40",subNum:"5"},
      */
    ],
    gungu:"종로구",
    street:"",
    addr:[],
    
  }
  
  componentDidMount() {
    let {addr} = this.state;
    let list = [];
    if (this.state.addr && this.state.addr.length ===0){
      //console.log(this.state.addr);
      console.log("Main componentDidMount")
      d3.csv(csvFile, (data, error) => {
        list = list.concat({...data});
       
        this.setState({
          addr: this.state.addr.concat({...data})
        })
       
        //console.log("addr: %s", addr);
        
      }).catch(function(err){
        console.log("d3.csv error: "+err);
      }).then(function(data){
        //console.log(data); // columns
      })        
      
    }
    
    //console.log(addr);
    /*
    d3.csv(csvFile).then(function(data) { 
      console.log([data]);
      this.setState({
        addr: [data]
      })
    })
    */
  }
  
  exitTable= (e) => {
    this.setState({
      gungu:""
    })
  }
  handleChange = (e) => {
    this.setState({
      gungu: e.target.innerHTML
    })
    console.log("button: %s", e.target.value);

  }
  changeStreet = (street) => {
    this.setState({
      street: street
    })
    //console.log("street changed? %s", street);
  }
  render(){
    
    //daum api key b45576e5990ea9f2ee92793cf38b63c0
    //const classes = useStyles();
    const {classes} = this.props;
    
    return (
      
      <div className="App">
        {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        */}
          <div className={classes.root}>
            {/* 
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  서울특별시 종로구, 중랑구 도로명 주소 정보
                </Paper>
              </Grid>
            </Grid>
            */}
            <div>
              <Grid container spacing={0} justify="flex-start" alignItems="center" direction="row">
                  <Grid item xs={1}>
                    <Paper className={classes.paper}>
                      <Button variant="primary" onClick={this.handleChange} value="jonro">종로구</Button>
                      <Button variant="info" onClick={this.handleChange} value="jungrang">중랑구</Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={10}>
                    <Paper className={classes.paper}>
                      <h2><b>서울특별시 종로구, 중랑구 도로명 주소 정보</b></h2>
                    </Paper>
                  </Grid>
                  <Grid item xs={1}>
                    <Paper className={classes.paper}>
                      <Button variant="info" onClick={this.exitTable}>exit</Button>
                    </Paper>
                  </Grid>
              </Grid>

              <Grid container spacing={0} justify="center" alignItems="stretch" direction="row">
                <Grid item xs={1}>
                  <Paper className={classes.paper}style={rowStyle}>
                    <TreeView
                      className={classes.root}
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                    >
                      
                      <SidoTree address={this.state.addr.filter( item => item.sigun === this.state.gungu )} gu = {this.state.gungu} onStreet={this.changeStreet}/>
                    </TreeView>
                  </Paper>
                </Grid>
                <Grid item xs={11}>
                  <Paper className={classes.paper}style={rowStyle}>
                    <div style={addressList}>
                    <AddressList gungu={this.state.gungu} list={this.state.addr.filter((val, i) => this.state.gungu === val.sigun && val.street === this.state.street)}/>
                    {/*"sido","sigun","dong","구주소본번","구주소부번","street","새주소본번","새주소부번","건물명","상세건물명","X좌표","Y좌표"*/}
                    </div>
                  </Paper>
                </Grid>
                
              </Grid>
            </div>
          </div>

          <div>
            
          </div>
      </div>  //main div
    );  //end return
  } // end render
} //end class


export default withStyles(styles)(Main);
