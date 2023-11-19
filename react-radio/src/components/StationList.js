import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from "react";
import { useStationData } from "../providers/StationProvider";
import Station from "./Station";
import AddButtonComponent from "./AddButtonComponent";

export default function StationList() {

    const {stations} = useStationData();

    //useEffect(() => {
    //    console.log("stations:", stations);
    //    console.log(stations.stations);
    //    console.log(stations.stations.length);
    //}, [stations])

    if (!stations.stations.length) return (
      <>
        <div>No Stations Listed</div>
        <Container className="border-0 d-flex align-items-center justify-content-center">
            <Row>
                <br />
            </Row>
            <Row className="border-0">
                <AddButtonComponent>
                </AddButtonComponent>
            </Row>
        </Container>
      </>
    )

    return (
        <Container className="border-0 align-items-center justify-content-center">
          <Row>
              <br />
          </Row>
          <Row className="title">
            <Col xs={2} md={3}>
            </Col>
            <Col xs={5} md={3}>
              Title
            </Col>
            <Col xs={2} md={3}>
              Genre
            </Col>
          </Row>
          {stations.stations.map(station => (
              <Station key={station.id} {...station}>
              </Station>
          ))}
          <Row>
              <br />
          </Row>
          <AddButtonComponent />
        </Container>
    )
}
