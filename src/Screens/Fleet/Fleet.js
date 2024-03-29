/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import {
  MDBAnimation,
  MDBCol,
  MDBContainer,
  MDBMask,
  MDBRow,
  MDBView,
} from "mdbreact";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import AddOnCard from "../../Components/AddOnCard/AddOnCard";
import FleetCard from "../../Components/FleetCard/FleetCard";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import slider1 from "../../Images/fleetbd.PNG";
import "../Fleet/Fleet.css";

class Fleet extends React.Component {
  state = {
    vehicleList: [],
    equipmentList: [],
  };
  async componentDidMount() {
    const { data: vehicleList } = await axios.get(
      "http://localhost:8080/api/v1/vehicle/getVehicles"
    );
  this.setState({vehicleList})
    
    const {data: equipmentList } = await axios.get(
      "http://localhost:8080/api/equipment/getAllEquipments"
    );
    this.setState({equipmentList});
   
    //  console.log(this.state.vehicleList);
  }
  render() {
    const data = this.state.vehicleList;
    const equipmentData = this.state.equipmentList;
    return (
      <div id="minimalistintro">
        <NavBar active="fleet" />
        <MDBView src={slider1}>
          <MDBMask />
          <MDBContainer className="d-flex justify-content-center align-items-center container-text">
            <MDBRow>
              <MDBAnimation className="black-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                <ScrollAnimation animateIn="bounceInLeft">
                  <p className="h-responsive  my-3 grey-text">
                    REACH YOUR
                    <strong style={{ color: "#ffb700" }}> DESTINATIONS</strong>
                  </p>

                  <h1
                    className="h1-responsive font-weight-bold"
                    style={{ fontSize: "5rem" }}
                  >
                    LET'S <span className="header-text-style">GO</span>
                  </h1>

                  <h4 className="mb-2">START AT £40 /per day</h4>
                  <div
                    style={{
                      backgroundColor: "#ffb700",
                      height: "0.1rem",
                      width: "5rem",
                      marginBottom: "1rem",
                    }}
                  />
                  <h6 className="mb-2" style={{ marginTop: "2rem" }}>
                    Choose from wide selection of Vehicle from Small Town Cars,
                    Hatchbacks and Vans to budget range all types of vehicles
                    meets your needs.
                  </h6>
                </ScrollAnimation>
              </MDBAnimation>
            </MDBRow>
          </MDBContainer>
        </MDBView>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol md="4" style={{ backgroundColor: "whitesmoke" }}>
              <div className="add-on-container">
                <h3>Add-on Options</h3>
                {equipmentData.map((equipment) => (
                  <AddOnCard data={equipment} />
                ))}
              </div>
            </MDBCol>
            <MDBCol md="8" className="fleet-container">
              {data.map((vehicle) => (
                <FleetCard data={vehicle} />
              ))}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div style={{ marginTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Fleet;
