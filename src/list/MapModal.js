import React, { useState, useEffect, useRef } from 'react';
import '../App.css';    
import {Modal, Button, ButtonToolbar} from 'react-bootstrap/'
import DaumMap from './DaumMap';

function LocationModal(props) {
    
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{opacity:1}}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    위치 보기
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DaumMap info={{...props.info}} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            {console.log("2 modal window")}
        </Modal>
        
    );
}
/*
function MapApi(props){
   
    console.log("3 map api");
    let mapContainer = document.getElementById('map');

    let geocoder = new daum.maps.services.Geocoder();
    
    let callback = function(result, status) {
        if (status === daum.maps.services.Status.OK) {
            console.log(result[0].x); // 126.570667
            console.log(result[0].y); // 33.45070100000001
            let option = {
                center: new daum.maps.LatLng(result[0].y, result[0].x),
                level: 5
            };
            let map = new daum.maps.Map(mapContainer, option);
        }
    };
    
    //195644.4035, 448243.9522
    
    // WTM 좌표를 WGS84 좌표계의 좌표로 변환한다
    geocoder.transCoord(props.long, props.lat, callback, {
        input_coord: daum.maps.services.Coords.WTM,
        output_coord: daum.maps.services.Coords.WGS84
    });
    
    //WGS84 : WGS84 좌표계
    //WCONGNAMUL : WCONGNAMUL 좌표계
    //CONGNAMUL : CONGNAMUL 좌표계
    //WTM : WTM 좌표계
    //TM : TM 좌표계
    
    
    
*/
function MapModal(props) {
    const [modalShow, setModalShow ] = useState(false);
    
    // Similar to componentDidMount and componentDidUpdate: 

    useEffect(() => { // Update the document title using the browser API 
        console.log("componentDidMount and DidUpdate");
        /*
        if(document.getElementById('map')){
            //MapApi(props);
        }
        */
        return () =>{   //unmount
            console.log("componentWillUnmount");
        }
      
        //console.log("map 2 %s", props.lat);
    },[]);    // Only re-run the effect if props changes    // class component / prevProps, prevState comparison

    console.log("1 return content");
    
    return (
        <div>
        <ButtonToolbar>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                위치 보기
            </Button>
            
            <LocationModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                info={props}
            />
        </ButtonToolbar>
        </div>
        
    );
    
}

export default MapModal;