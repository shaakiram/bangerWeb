import React from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdbreact";
import SideNav from "../../../Components/SideNav/SideNav";
import TopNavigation from "../../../Components/TopNavigation/TopNavigation";

class Compare extends React.Component {
  state = {
    list: [],
    vehicleList: [],
    newList: [],
    high: 0,
    visible: true,
    visibleMalkey: true,
    visibleAmeri: false,
    ameriList: [],
  };
  loadData = async () => {};
  async componentDidMount() {
    const { data: list } = await axios.get(
      "http://localhost:9191/api/webScrape/getData/Malkey"
    );
    this.setState({ list });
    const { data: ameriList } = await axios.get(
      "http://localhost:9191/api/webScrape/getData/Ameri"
    );
    this.setState({ ameriList });
    const { data: vehicleList } = await axios.get(
      "http://localhost:8080/api/v1/vehicle/getVehicles"
    );
    this.setState({ vehicleList });
    console.log(this.state.vehicleList);
    let their = this.state.list;
    let our = this.state.vehicleList;
    let ameri = this.state.ameriList;

    for (let i = 0; i < their.length; i++) {
      for (let j = 0; j < our.length; j++) {
        var y = their[i].vehicleName
          .split(" ")
          .slice(0, 2)
          .join(" ");

        if (y.toString().toLowerCase() === our[j].name.toLowerCase()) {
          for (let k = 0; k < ameri.length; k++) {
            var q = ameri[k].vehicleName
              .split(" ")
              .slice(0, 2)
              .join(" ");
              console.log(q)
            if (q.toString().toLowerCase() === our[j].name.toLowerCase()) {
             
              const name = our[j].name;
              const theirPrice = their[i].ratePerWeek;
              const ourPrice = our[j].price;
              const perWeek = ourPrice * 7 * 255.0;
              const newStr = theirPrice.replace(/,/g, "");
            
              let bvm=0;
              if (newStr < perWeek) {
                bvm=1;
              }
              let bva =0
              if(ameri[k].ratePerWeek.split("/")[0].replace(/,/g, "")<perWeek){
                bva=1
              }
              const x = perWeek
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              const obj = {
                name: name,
                theirPrice: theirPrice,
                ourPrice: x,
                bvm: bvm,
                ameri: ameri[k].ratePerWeek.split("/")[0]+".00",
                bva:bva
              };
              this.setState({ newList: [...this.state.newList, obj] });
              break;
            }
          }
         
          if(q.toString().toLowerCase() !== our[j].name.toLowerCase()){
            const name = our[j].name;
            const theirPrice = their[i].ratePerWeek;
            const ourPrice = our[j].price;
            const perWeek = ourPrice * 7 * 255.0;
            const newStr = theirPrice.replace(/,/g, "");
            if (newStr < perWeek) {
              this.setState({ high: 1 });
            }
            const x = perWeek
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const obj = {
              name: name,
              theirPrice: theirPrice,
              ourPrice: x,
              bvm: this.state.high,
              ameri: "-",
              bva:"-"
            };
            this.setState({ newList: [...this.state.newList, obj] });
          
          }
        }
      }
    }
    console.log(this.state.newList);
  }

  render() {
    return (
      <div>
        <SideNav active="compare" />
        <TopNavigation />
        <div className="inner-di">
          <div style={{ margin: "1rem", marginTop: "3rem" }}>
            <strong style={{ marginLeft: "1rem", marginTop: "1rem" }}>
              COMPARE
            </strong>

            <div style={{ backgroundColor: "white" }}>
              <div
                style={{
                  height: "3px",
                  backgroundColor: "#ffb700",
                  marginLeft: "0.5rem",
                  width: "120px",
                }}
              />
            </div>
            {this.state.visible === true ? (
              <div>
                <div
                  style={{
                    margin: "1rem",
                    marginRight: "2rem",
                    float: "right",
                  }}
                >
                  <MDBBtn
                    color="black"
                    onClick={() => this.setState({ visible: false })}
                  >
                    Competitors Price
                  </MDBBtn>
                </div>
                <div className="search-bar">
                  <h6>
                    <strong>COMPARISON FOR PRICE PER WEEK</strong>
                  </h6>
                  <hr />
                  <MDBTable striped bordered id="myTable">
                    <MDBTableHead style={{ textAlign: "center" }}>
                      <tr>
                        <th>NAME</th>
                        <th>MALKEY</th>
                        <th>AMERI</th>
                        <th>BANGERS</th>
                        <th>BANGERS & CO Vs MALKEY</th>
                        <th>BANGERS & CO Vs AMERI</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody style={{ textAlign: "center" }}>
                      {this.state.newList.map((vehicle) => (
                        <tr>
                          <td>{vehicle.name}</td>
                          <td>{vehicle.theirPrice}</td>
                          <td>{vehicle.ameri}</td>
                          <td>{vehicle.ourPrice}.00</td>
                          <td>
                            {vehicle.bvm === 1 ? (
                              <MDBIcon
                                icon="arrow-up"
                                style={{ color: "red" }}
                              />
                            ) : (
                              <MDBIcon
                                icon="arrow-down"
                                style={{ color: "green" }}
                              />
                            )}
                          </td>
                          <td>
                            {vehicle.bva === 1 ? (
                              <MDBIcon
                                icon="arrow-up"
                                style={{ color: "red" }}
                              />
                            ) : vehicle.bva !== 0 ? <p>-</p> : (
                              <MDBIcon
                                icon="arrow-down"
                                style={{ color: "green" }}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    margin: "1rem",
                    marginRight: "2rem",
                    float: "right",
                  }}
                >
                  <MDBBtn
                    color="black"
                    onClick={() => this.setState({ visible: true })}
                  >
                    Compare
                  </MDBBtn>
                </div>
                <div className="search-bar">
                  <MDBRow>
                    <h6
                      onClick={() => {
                        this.setState({ visibleMalkey: true });
                      }}
                      style={{
                        color:
                          this.state.visibleMalkey === true
                            ? "#ffb700"
                            : "black",
                      }}
                    >
                      <strong>MALKEY</strong>
                    </h6>
                    <div
                      style={{
                        width: "2px",
                        height: "20px",
                        backgroundColor: "black",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    <h6
                      style={{
                        color:
                          this.state.visibleMalkey === false
                            ? "#ffb700"
                            : "black",
                      }}
                      onClick={() => {
                        this.setState({ visibleMalkey: false });
                      }}
                    >
                      <strong>AMERI</strong>
                    </h6>
                  </MDBRow>

                  <hr />
                  {this.state.visibleMalkey === true ? (
                    <div>
                      <h5 style={{ margin: "2rem" }}>
                        <strong>MALKEY RENT-A-CAR</strong>
                      </h5>
                      <MDBTable striped bordered id="myTable">
                        <MDBTableHead style={{ textAlign: "center" }}>
                          <tr>
                            <th>NAME</th>
                            <th>RATE PER WEEK</th>
                            <th>RATE PER MONTH</th>
                            <th>EXCESS MILEAGE PER DAY</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody style={{ textAlign: "center" }}>
                          {this.state.list.map((vehicle) => (
                            <tr>
                              <td>{vehicle.vehicleName}</td>
                              <td>{vehicle.ratePerWeek}</td>
                              <td>{vehicle.ratePerMonth}</td>
                              <td>{vehicle.excessMileagePerDay}</td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                  ) : (
                    <div>
                      <h5 style={{ margin: "2rem" }}>
                        <strong>AMERI RENT-A-CAR</strong>
                      </h5>
                      <MDBTable striped bordered id="myTable">
                        <MDBTableHead style={{ textAlign: "center" }}>
                          <tr>
                            <th>NAME</th>
                            <th>RATE PER WEEK</th>
                            <th>RATE PER MONTH</th>
                            <th>EXCESS MILEAGE PER DAY</th>
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody style={{ textAlign: "center" }}>
                          {this.state.ameriList.map((vehicle) => (
                            <tr>
                              <td>{vehicle.vehicleName}</td>
                              <td>{vehicle.ratePerWeek}</td>
                              <td>{vehicle.ratePerMonth}</td>
                              <td>{vehicle.excessMileagePerDay}</td>
                            </tr>
                          ))}
                        </MDBTableBody>
                      </MDBTable>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Compare;
