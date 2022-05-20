import axios from "axios";
import React, {  useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { API } from "../API";
import swal from "sweetalert";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

function Popup(props) {
  const token = localStorage.getItem("token");
  const [characters, setCharacters] = useState(300)
  const history = useHistory();
  const[userquestion, setUserQuestion]=useState({
    name:"",
    contact:"",
    question:""
  })
  const [useraddress, setUserAdress]= useState({userName:"", address:"", state:"", pin:"", country:"", phoneNo:"",city:""})
const {userName,phoneNo,address,state,pin,country,city}=useraddress
const {name, contact, question,product} = userquestion

const changeState = (newState) =>
setUserAdress((prevState) => ({ ...prevState, ...newState }));

const getUserAdress = (event) => {
  const { name, value } = event.target;
  changeState({ [name]: value })
};

async function handleAdressSubmit (event){
  event.preventDefault();
  if(
    userName=== "" ||
    phoneNo=== "" ||
    address=== "" ||
    state=== "" ||
    pin==="" ||
    city===""||
    country=== ""
  )
    return   swal("Oops!", "Please fill all the required fields", "error");
  if (phoneNo.length < 10 || phoneNo.length > 10)
    return swal("Oops!", "Please Fill Valid Mobile No", "error");
  else{
    let response = await axios.post(`${API}/api/address/add_Address`,
    { name:userName,
      phoneNo,
      address,
      state,
      pin,
      city,
      country
      }
     ,
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
     )
     if(response.data.message==="Success")
     {
      swal({
        title: "Success!",
        text: "Address Added Successfully",
        icon: "success",
        button: "Done",
        type: "success",
      }).then(() => {
        window.location = `/my-address`;
      });
    }else{
      swal("Oops!", "Something went wrong!", "error");
    }

  }
}

const getUserQuestion = (event) => {
  const { name, value } = event.target;

  setUserQuestion((preval) => {
    return { ...preval, [name]: value };
  });
};
async function handleSubmit(event){
  event.preventDefault();
  if(!(
    name||
    contact||
    question
  )){
    // alert("please fill all the fields")
    swal("Oops!", "Please fill all the required fields", "error");
    return
  }else{
    let response = await axios.post(`${API}/api/question/add_Question`,
    { name,
     contact,
     question,
      product:props.id
     }
    ,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    if (response.data.message === "Success") {
      swal({
        title: "Send Successsfully!",
        text: "Thanks for Asking a question",
        icon: "success",
        button: "Done",
        type: "success",
      }).then(() => {
        window.location = `/productDetails/${props.id}`;
      });
    }else{
      swal("Oops!", "Something went wrong!", "error");
    }

  }
}


useEffect(()=>
 titleCharacter()
 ,[question])

 const titleCharacter=()=>{
     setCharacters(300-question.length)
 }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      {props.modelfor === "address" && (
          <>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
             Add New Address
          </Modal.Title>
        </Modal.Header>

            <Modal.Body>

              <input
                value={userName}
                name="userName"
                onChange={getUserAdress}
                className="mt-3"
                type="text"
                placeholder="Enter Your Name"
              />
              <div className="row">
                <div className="col-6">
                  <input
                    value={address}
                    name="address"
                    onChange={getUserAdress}
                    className="mt-3"
                    type="text"
                    placeholder="Enter Your Address"
                  />
                </div>
                <div className="col-6">
                  <input
                    value={pin}
                    name="pin"
                    onChange={getUserAdress}
                    className="mt-3"
                    type="number"
                    placeholder="Enter Pin Code"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <CountryDropdown

                    value={country}
                    onChange={(val) => changeState({country:val})}
                  />
                </div>
                <div className="col-6">
                  <RegionDropdown
                  defaultOptionLabel="Select Region"
                    country={country}
                    value={state}
                    onChange={(val) => changeState({state:val})}
                  />
                </div>
              </div>
              <div className="row mt-3">
                 <div className="col-6">
                 <input
                value={city}
                name="city"
                onChange={getUserAdress}
                className="mt-3"
                type="text"
                placeholder="City"
              />
                   </div>
                   <div className="col-6">
              <input
                value={phoneNo}
                name="phoneNo"
                onChange={getUserAdress}
                className="mt-3"
                type="number"
                placeholder="Enter Phone Number"
              />
              </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
            <Button style={{color:"white" ,backgroundColor:"#81BF33", outline:"none", border:"none"}} onClick={handleAdressSubmit}>Add</Button>
              <Button style={{color:"white" ,backgroundColor:"#81BF33", outline:"none", border:"none"}} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </>
        )
      }
         {props.modelfor === "question" && (
          <>

          <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
             Ask a Question
          </Modal.Title>
        </Modal.Header>
        <div className="mx-3">
        <h4>  Product: {props.productName}</h4>
        </div>

            <Modal.Body>
              {/* <div className="row">
                <div className="col-6">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-3"
                    type="text"
                    placeholder="Enter Your Address"
                  />
                </div>
                <div className="col-6">
                  <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="mt-3"
                    type="text"
                    placeholder="Enter Pin Code"
                  />
                </div>
              </div> */}



              <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={getUserQuestion}
                        placeholder="Your Name"
                        required=""
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                      <input
                        type="text"
                        name="contact"
                        value={contact}
                        onChange={getUserQuestion}
                        placeholder="Email or Phone"
                        required=""
                      />
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                      <textarea
                        name="question"
                        value={question}
                        onChange={getUserQuestion}
                        placeholder="Write Your Question"
                        maxlength="300"
                      ></textarea>
                      <sapn>Remaining Characters {characters}</sapn>
                    </div>
                    </div>

            </Modal.Body>
            <Modal.Footer>
              <Button style={{color:"white" ,backgroundColor:"#81BF33", outline:"none", border:"none"}} onClick={props.onHide}>Close</Button>
              <Button style={{color:"white" ,backgroundColor:"#81BF33", outline:"none", border:"none"}} type="submit" onClick={(e)=>handleSubmit(e)} >Send Question</Button>
            </Modal.Footer>
          </>
        )}
          {props.modelfor === "delivery" && (
            <>
            <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
               Delivery & Return
            </Modal.Title>
          </Modal.Header>

              <Modal.Body>
              <p>
                {props.delievery}
                </p>
               </Modal.Body>
                </>
          )
}
      </Modal>
    </div>
  );
}

export default Popup;
