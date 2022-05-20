import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Calendar from "react-calendar";
import "../../node_modules/react-calendar/dist/Calendar.css";
import { TimePickerComponent } from "../../node_modules/@syncfusion/ej2-react-calendars";
import { Link, useParams, useHistory } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import axios from "axios";
import { API } from "../API";
import swal from "sweetalert";
import moment from "moment";
import Navigation from "./Navigation"


const Consultation = () => {
  const history = useHistory();
  const [bookingdetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "India",
    concern: "",
    question: "",
    feedback: "",
    timevalue: "",
    mintime: new Date("01/01/2021 00:00 AM"),
    maxtime: new Date("01/01/2021 11:30 PM"),
    Appointmentdate: new Date(),
    currentdate: new Date(),
  });

  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    concern,
    question,
    feedback,
    timevalue,
    mintime,
    maxtime,
    Appointmentdate,
    currentdate,
  } = bookingdetails;

  const changeState = (newState) =>
    setBookingDetails((prevState) => ({ ...prevState, ...newState }));
// convert in required time format
    const converdatestamp = (inputformat) => {
      var a = moment(inputformat);
      return a.format(" ddd, MMMM D, YYYY");
    };
    const converttimestamp = (inputformat) => {
      var a = moment(inputformat);
      return a.format("h:mm A");
    };
  
// handle changes
  const onChange = (Appointmentdate) => {
    changeState({ Appointmentdate: Appointmentdate });
  };

  function handleTimeChange(time) {
    changeState({ timevalue: time });
  }
  function handleBack(e){
    changeState({timevalue:""})
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    changeState({ [name]: value });
  };



  async function handleConsultation(e) {
    e.preventDefault();
    if (
      !firstName ||
      !email ||
      !phone ||
      !country ||
      !concern ||
      // !question ||
      !feedback ||
      timevalue === null ||
      Appointmentdate === null
    ) {
      alert("please fill all the fields");
      return;
    }
    if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email
      )
    ) {
      alert("Please Fill Valid Email Address");
      return;
    }

    if (phone.length < 10 || phone.length > 10) {
      alert("Please Fill Valid Mobile No");
      return;
    }
    let res = await axios.post(`${API}/api/consult/add_Consult`, {
      firstName: firstName,
      country: country,
      lastName: lastName,
      phone: phone,
      email: email,
      concern: concern,
      additionalNotes: question,
      popProduct: feedback,
      appointmentDate: Appointmentdate,
      appointmentTime: timevalue,
    });
    if ((res.data.message = "success")) {
      swal({
        title: "Book Successsfully!",
        icon: "success",
        button: "Done",
        type: "success",
      }).then(() => {
        window.location.reload();
        // history.push("/onlineconsultation");
      });
    } else {
      swal("Oops!", "Something went wrong!", "error");
    }
  }

  return (
    <>
      <Header />
      <Navigation/>
      <div className="main-content mt-4">
        <div className="page-content">
          <div className="container">
            <h1
              className="text-center"
              style={{
                fontSize: "25px",
                fontWeight: "400",
                textDecoration: "none solid rgb(40, 40, 40)",
              }}
            >
              Online Consultation
            </h1>
            <p style={{ fontSize: "14px", padding: "20px 60px", textAlign:"justify" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              <br /> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              concerns and create a tailored skincare routine and/or
              professional treatment routine that will transform your skin over
              90 days.
              <br />
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            <h4
              style={{
                fontSize: "20px",
                fontWeight: "400",
                textDecoration: "none solid rgb(40, 40, 40)",
                textAlign: "center",
              }}
            >
              Book your Virtual Consultation now
            </h4>

            {timevalue === "" ? (
              <>
                <div
                  className="container"
                  width="100%"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="card shadow-lg"
                    style={{
                      margin: "35px",
                      width: "854px",
                      height: "639px",
                      borderRadius: "20px",
                      overflow: "scroll",
                    }}
                  >
                    <div className="card-body" style={{ padding: "0px" }}>
                      <div
                        className="row media"
                        style={{ paddingRight: "0px", paddingLeft: "0px" }}
                      >
                        <div className="col-12">
                          <div className="row">
                            <div
                              className="col-lg-6 col-12 py-5"
                              style={{
                                backgroundColor: "#DBDBDB",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                borderRadius: "10px 0  0px 10px",
                              }}
                            >
                              <figure
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "100%",
                                  marginBottom: "20px",
                                }}
                              >
                                <img
                                  src="/assets/images/online-consult/health-check.png"
                                  alt="Trulli"
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    marginBottom: "10px",
                                  }}
                                />
                                <figcaption
                                  style={{
                                    fontSize: "22px",
                                    textAlign: "center",
                                    fontWeight: "400",
                                    padding: "5px",
                                  }}
                                >
                                  Meet with our Qualified Ultra Experts
                                </figcaption>
                              </figure>

                              <Calendar
                                className={["c1", "c2"]}
                                onChange={onChange}
                                value={Appointmentdate}
                                minDate={currentdate}
                                hover={Appointmentdate}
                                maxDetail="month"
                              />
                            </div>
                            <div className="col-lg-6 col-12 p-5">
                              <h1
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  marginBottom: "10px",
                                }}
                              >
                                Meeting duration
                              </h1>
                              <p
                                className="text-center p-2 text-dark"
                                style={{
                                  backgroundColor: "#E5EAF0",
                                  borderRadius: "5px",
                                }}
                              >
                                30 Minutes
                              </p>
                              <p>What time works best?</p>
                              <lable >
                              <TimePickerComponent
                                placeholder="Select a time(Click on clock icon)"
                                for="basicpill-phoneno-input"
                                value={timevalue}
                                min={mintime}
                                max={maxtime}
                                step={30}
                                className="form-control timestyle"
                                // onClick={handleInputClick}
                                // onToggle={handleToggle}
                                onChange={(e) =>
                                  handleTimeChange(e.target.value)
                                }
                              />
                              </lable>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center mb-5">
                <div className="card consult">
                  <div className="card-body py-3 px-5 m-3">
                    <div className="row">
                      <div className="col-12">
                        <h1
                          style={{
                            fontSize: "20px",
                            fontWeight: "400",
                            paddingBottom: "15px",
                          }}
                        >
                          Confirm meeting
                        </h1>
                        <p style={{color:"black"}}> {`${converdatestamp(Appointmentdate)} ${converttimestamp(timevalue)}`} <span style={{color:"blue", cursor:"pointer"}} onClick={()=>handleBack()}>Edit</span> </p>
                        <form>
                          <div className="row">
                            <div className="col-lg-12 txtarea">
                              <div className="row">
                                <div className="col-md-12 col-lg-6 col-xl-6">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      First Name*
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control input-field"
                                      id="basicpill-phoneno-input"
                                      value={firstName}
                                      name="firstName"
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6 col-xl-6">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      Last Name*
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control input-field"
                                      id="basicpill-phoneno-input"
                                      name="lastName"
                                      value={lastName}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-12 col-lg-6 col-xl-6">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      Email Address*
                                    </label>
                                    <input
                                      type="email"
                                      value={email}
                                      className="form-control input-field"
                                      id="basicpill-phoneno-input"
                                      onChange={handleChange}
                                      name="email"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12 col-lg-6 col-xl-6">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      Mobile Number*
                                    </label>
                                    <input
                                      type="tel"
                                      className="form-control input-field"
                                      id="basicpill-phoneno-input"
                                      value={phone}
                                      onChange={handleChange}
                                      name="phone"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      Country*
                                    </label>
                                    <CountryDropdown
                                      defaultOptionLabel="Select Country"
                                      className="form-control input-field countrystyle"
                                      value={country}
                                      onChange={(val) =>
                                        changeState({ country: val })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      What is your main skin concern?*
                                    </label>
                                    <textarea
                                      className="form-control input-field"
                                      rows="3"
                                      name="concern"
                                      value={concern}
                                      onChange={handleChange}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      How you or do you currently use Potions of
                                      Paradise products?*
                                    </label>
                                    <textarea
                                      className="form-control input-field"
                                      rows="3"
                                      name="feedback"
                                      value={feedback}
                                      onChange={handleChange}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="form-group ">
                                    <label
                                      for="basicpill-phoneno-input"
                                      className="label-100"
                                    >
                                      Additional notes or Questions for the Skin
                                      Expert?
                                    </label>
                                    <textarea
                                      className="form-control"
                                      rows="3"
                                      name="question"
                                      value={question}
                                      onChange={handleChange}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer consultfooter">
                    <div className="row">
                      <div className="col-12">
                        <div className="row d-flex">
                          <div className="col-lg-6">
                         
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={()=>handleBack()}
                            >
                              Back
                            </button>
                          </div>

                          <div className="col-lg-6 d-flex justify-content-end bookbtn">
                            <button
                              type="button"
                              className="btn btn-success "
                              onClick={(e) => handleConsultation(e)}
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Consultation;
