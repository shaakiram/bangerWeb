import React from "react";
import axios from "axios";
import ChatBot from "react-simple-chatbot";
import {
  MDBMask,
  MDBRow,
  MDBView,
  MDBContainer,
  MDBAnimation,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBModal,
} from "mdbreact";
import ScrollAnimation from "react-animate-on-scroll";
import slider1 from "../../Images/contactUs.PNG";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import { ThemeProvider } from "styled-components";
import "../ContactUs/ContactUs.css";
class ContactUs extends React.Component {
  state = {
    contact: { name: "", email: "", subject: "", message: "" },
    modal: false,
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleChange = (e) => {
    const contact = { ...this.state.contact };
    contact[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ contact });
  };
  handleSubmit = async () => {
    await axios
      .post("http://localhost:8080/api/contact/addContact", this.state.contact)
      .then((response) => {
        if (response.status === 200) {
          console.log("Submitted");
          this.setState({
            contact: { name: "", email: "", subject: "", message: "" },
          });
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    const theme = {
      background: "#f5f8fb",
      headerBgColor: "black",
      headerFontColor: "#fff",
      headerFontSize: "18px",
      botBubbleColor: "black",
      botFontColor: "#fff",
      userBubbleColor: "#fff",
      userFontColor: "#4a4a4a",
    };
    const disable =
      this.state.contact.name === "" ||
      this.state.contact.email === "" ||
      this.state.contact.subject === "" ||
      this.state.contact.message === "";
    return (
      <div id="minimalistintro">
        <NavBar active="contact" />
        <MDBView src={slider1}>
          <MDBMask />
          <MDBContainer
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "12rem", marginLeft: "-19rem" }}
          >
            <MDBRow>
              <MDBAnimation className="black-text text-center text-md-left  mt-xl-5 mb-5">
                <ScrollAnimation animateIn="bounceInLeft">
                  <h1
                    className="h1-responsive font-weight-bold"
                    style={{ fontSize: "3rem" }}
                  >
                    GET IN TOUCH
                  </h1>
                  <h3 className="mt-3">
                    Let's make something
                    <br /> awesome together.
                  </h3>
                  <hr className="hr" style={{ backgroundColor: "#ffb700" }} />
                  <h6 className="mb-2 grey-text" style={{ marginTop: "2rem" }}>
                    DROP US A LINE, OR GIVE US A HEADS UP <br />
                    IF YOU'RE INTERESTED IN TRAVELING WITH US.
                  </h6>
                </ScrollAnimation>
              </MDBAnimation>
            </MDBRow>
          </MDBContainer>
          <div
            style={{
              position: "fixed",
              right: 0,
              zIndex: 100,
              marginRight: "10px",
            }}
          >
            <MDBBtn
              color="black"
              style={{ borderRadius: "75%", padding: 0 }}
              onClick={this.toggle}
            >
              <MDBIcon
                far
                size="2x"
                icon="comment"
                className="amber-text"
                style={{ margin: "15px" }}
              />
            </MDBBtn>
          </div>
        </MDBView>

        <MDBRow style={{ height: "700px" }}>
          <MDBCol md="10"></MDBCol>
          <MDBCol md="2" style={{ backgroundColor: "#ffb700" }}></MDBCol>
        </MDBRow>

        <MDBRow
          style={{
            height: "700px",
            marginTop: "-700px",
            paddingTop: "4rem",
            paddingBottom: "4rem",
          }}
        >
          <MDBCol md="8" style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
            <h2 className="h1-responsive font-weight-bold  my-5">Contact us</h2>
            <form>
              <MDBRow>
                <MDBCol md="6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="name"
                      label="Your name"
                      name="name"
                      validate
                      value={this.state.contact.name}
                      onChange={this.handleChange}
                    />
                  </div>
                </MDBCol>
                <MDBCol md="6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="email"
                      id="email"
                      label="Your email"
                      name="email"
                      validate
                      value={this.state.contact.email}
                      onChange={this.handleChange}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="subject"
                      label="Subject"
                      name="subject"
                      validate
                      value={this.state.contact.subject}
                      onChange={this.handleChange}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="textarea"
                      id="message"
                      label="Your message"
                      name="message"
                      validate
                      value={this.state.contact.message}
                      onChange={this.handleChange}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
            </form>
            <div className="text-center text-md-left">
              <MDBBtn
                color="black"
                size="md"
                outline
                onClick={(e) => this.handleSubmit()}
                disabled={disable}
              >
                submit
              </MDBBtn>
            </div>
          </MDBCol>
          <MDBCol
            md="4"
            style={{ backgroundColor: "black" }}
            className="text-center"
          >
            <ul className="list-unstyled mb-0" style={{ marginTop: "6rem" }}>
              <li>
                <MDBIcon
                  icon="map-marker-alt"
                  size="2x"
                  className="amber-text"
                />
                <p className="white-text">
                  {" "}
                  No. 388 Union Place,
                  <br />
                  Colombo 00200
                </p>
              </li>
              <li>
                <MDBIcon icon="phone" size="2x" className="amber-text mt-4" />
                <p className="white-text">
                  0117 675 100
                  <br />
                  0117 562 172
                </p>
              </li>
              <li>
                <MDBIcon
                  icon="envelope"
                  size="2x"
                  className="amber-text mt-4"
                />
                <p className="white-text">
                  Bangerandco@gmail.com
                  <br />
                  bangers@gmail.com
                </p>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
        <div style={{ marginTop: "2rem" }}>
          <Footer />
        </div>
        <div>
          <MDBModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            side
            position="top-right"
            className="special_modal"
          >
            <ThemeProvider theme={theme}>
              <ChatBot
                steps={[
                  {
                    id: "1",
                    message: "What is your name?",
                    trigger: "2",
                  },
                  {
                    id: "2",
                    user: true,
                    trigger: "3",
                  },
                  {
                    id: "3",
                    message: "Hi {previousValue}, nice to meet you!",
                    trigger: "4",
                  },
                  {
                    id: "4",
                    message: "How can i help You",
                    trigger: "5",
                  },
                  {
                    id: "5",
                    user: true,
                    trigger: "6",
                  },
                  {
                    id: "6",
                    message: "What Type of Car do u want?",
                    trigger: "5",
                  },
                ]}
              />
            </ThemeProvider>
          </MDBModal>
        </div>
      </div>
    );
  }
}
export default ContactUs;
