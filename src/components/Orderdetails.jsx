import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navigation from "./Navigation";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReceiptIcon from "@material-ui/icons/Receipt";
import axios from "axios";
import { API } from "../API";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Ordered", "Packed", "Shipped", "Delivered"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Step 1: Ordered";
    case 1:
      return "Step 2: Packed?";
    case 2:
      return "Step 3: Shipped";
    case 3:
      return "Step 4: Delivered";
    default:
      return "Unknown step";
  }
}

function Orderdetails() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [product, setProduct] = useState([]);
  console.log(id);
  useEffect(() => {
    async function getOrderDetails() {
      const details = await axios.get(`${API}/api/order/${id}`);
      console.log(details);
      setOrderDetails(details.data.order);
      setProduct(details.data.order.product);
    }
    getOrderDetails();
  }, []);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div>
        <div class="table-responsive mt-5 mb-1 p-0 container">
          <table class="table">
            <tr>
              <td>
                <span className="font-weight-bold">OrderID: </span>
                <span className="mr-3">{id}</span>
              </td>
              <td>
                <span className="font-weight-bold">Order Date:</span>{" "}
                <span className="mr-3">25-08-21</span>
              </td>
              <td>
                <span className="font-weight-bold">Order Amount: </span>{" "}
                <span className="mr-3">2500</span>
              </td>
            </tr>
          </table>
        </div>
        <div
          className="container mt-1 p-3 d-flex align-items-center justify-content-around"
          style={{ backgroundColor: "#eee" }}
        >
          {orderDetails.map((el) => {
            return (
              <div>
                <h6>Delivery Address</h6>
                <h6>{`${el.firstName} ${el.lastName}`}</h6>
                <p>
                  {`${el.address} ${el.city} ${el.country}`}
                  {/* 416/182 Dilaram baradari chaupatiya, near three tower Lucknow
                  - 226003, Uttar Pradesh */}
                </p>
                <h6>Phone Number</h6>
                <p>{el.phone}</p>
              </div>
            );
          })}

          <div className="d-flex">
            <a href="#" className="mr-3">
              Download Invoice
            </a>
            <ReceiptIcon />
          </div>
        </div>
      </div>
      <div>
        <div class="table-responsive mt-5 mb-5 p-0 container">
          <table class="table">
            {product.map((prod) => {
              return (
                <tr>
                  <td>
                    <div className="container d-flex align-items-center">
                      <img
                        style={{ width: "100px" }}
                        src={prod.image[0]}
                        alt="product"
                      />
                      <div className="ml-3">
                        <p>{prod.title}</p>
                        <p>{prod.quantity}</p>
                        <h6>{prod.price}</h6>
                      </div>
                    </div>
                    <div className={classes.root}>
                      <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                          <Step key={label} style={{ pointerEvents: "none" }}>
                            <StepButton
                              onClick={handleStep(index)}
                              completed={completed[index]}
                            >
                              {label}
                            </StepButton>
                          </Step>
                        ))}
                      </Stepper>
                      <div>
                        {allStepsCompleted() ? (
                          <div>
                            <Typography className={classes.instructions}>
                              All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset}>Reset</Button>
                          </div>
                        ) : (
                          <div>
                            <Typography className={classes.instructions}>
                              <p>Order Date:25-8-21</p>
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* <td>

                  </td> */}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Orderdetails;
