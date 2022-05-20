import React,{useState} from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import { API } from "../API";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import swal from "sweetalert";
function Changepassword() {
  const history = useHistory();
  const [password, setPassword]=useState({oldPassword:false,newPassword:false, confirmpassword:false, oldPasswordval:"", newPasswordval:"", confirmpasswordval:"" })
const{oldPassword,newPassword, confirmpassword, oldPasswordval, newPasswordval, confirmpasswordval}=password
const changeState = (newState) =>
setPassword((prevState) => ({ ...prevState, ...newState }));
const token = localStorage.getItem("token");
const handleChange=(e)=>{
  changeState({
    [e.target.name]: e.target.value,
  });
}

const handleCancel=()=>{
  history.push(`/`);
}
const handleSubmit = async () => {

  if (
    oldPasswordval === "" ||
    newPasswordval === "" ||
    confirmpasswordval === ""
    ) {
      swal({
        title: "Error",
        text: "Please Fill all fields",
        icon: "error",
        buttons: true,
        dangerMode: true,
      });
      return;
    }
    if(newPasswordval!==confirmpasswordval ){
      swal({
        title: "Error",
        text: "New password and confirm password does not match",
        icon: "error",
        buttons: true,
        dangerMode: true,
      });
      return;
    }
    let response = await axios.post(`${API}/api/user/password`,
    { oldPassword:oldPasswordval,
      newPassword:newPasswordval,

      }
     ,
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
     )
     if(response.data.code===401)
    {
     swal({
      title: "Error",
      text: "Current Password is wrong",
      icon: "error",
      buttons: true,
      dangerMode: true,
    });
    return;
  }
  if(response.data.status==="Success")
  {
    swal({
      title: "Password Changed Successfully",
      text: "",
      icon: "success",
      buttons: true,
      dangerMode: true,
    }).then(() => {
      window.location = `/`;
    });
    return;
  }

}


  return (
    <div>
      <Header />
      <Navigation />
      <div class="container my-5">
	<div class="row d-flex align-items-center justify-content-center">
		<div class="col-sm-5">

		    <label>Current Password</label>
		    <div class="form-group pass_show">
                <input type={oldPassword? "text" :"password"} value={oldPasswordval} name="oldPasswordval"  onChange={handleChange} class="form-control" placeholder="Current Password" required/>

                {oldPassword? <RemoveRedEyeIcon className="passwicon" onClick={()=>changeState({oldPassword:!oldPassword})} /> :<VisibilityOffIcon className="passwicon" onClick={()=>changeState({oldPassword:!oldPassword})} />}

            </div>
		       <label>New Password</label>
            <div class="form-group pass_show">
                <input type={newPassword? "text" :"password"} name="newPasswordval"  onChange={handleChange}  value={newPasswordval} class="form-control" placeholder="New Password" required/>
                {newPassword? <RemoveRedEyeIcon className="passwicon" onClick={()=>changeState({newPassword:!newPassword})} /> :<VisibilityOffIcon className="passwicon" onClick={()=>changeState({newPassword:!newPassword})} />}
            </div>
		       <label>Confirm Password</label>
            <div class="form-group pass_show">
                <input type={confirmpassword? "text" :"password"} name="confirmpasswordval"  onChange={handleChange}  value={confirmpasswordval} class="form-control" placeholder="Confirm Password" required/>
                {confirmpassword? <RemoveRedEyeIcon className="passwicon" onClick={()=>changeState({confirmpassword:!confirmpassword})} /> :<VisibilityOffIcon className="passwicon" onClick={()=>changeState({confirmpassword:!confirmpassword})} />}
            </div>

               <button className="btn" style={{backgroundColor:"#81BF33", marginRight:"10px", color:"white"}} onClick={handleSubmit} >Submit</button>
              <button className="btn"  style={{backgroundColor:"#81BF33", color:"white"}} onClick={handleCancel} >Cancel</button>


		</div>
	</div>
</div>


      <Footer />
    </div>
  );
}

export default Changepassword;
