import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBSpinner } from "mdb-react-ui-kit";
import { setService } from "../../service/redux/reducers/services";
import "./style.css";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBBtn,
   
  } from 'mdb-react-ui-kit';

const ProviderSesvice = () => {
  const history = useNavigate();
  const { service } = useSelector((state) => {
    return {
      service: state.services.service,
    };
  });
  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/services/byId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        dispatch(setService(result.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (service.length == 0) {
    return (
      <MDBSpinner color="danger">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }
  return (
    <div >
      <MDBBtn className="justefy item left"></MDBBtn>
                <MDBRow>
              <MDBCol md="12">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">Services</MDBCardText>
                  {service.map((data, i) => {
        return <div key={i}>
            <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Services</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{data.service}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Price_Per_Hour</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{data.price_per_hour} JD</MDBCardText>
                  </MDBCol>
                </MDBRow>
                {/* <hr /> */}
        </div>;
      })}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              </MDBRow>
        
    </div>
  );
};

export default ProviderSesvice;
