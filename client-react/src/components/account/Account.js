import { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Container, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Account = () => {
  const [formData, setFormData] = useState({});

  const userId = sessionStorage.getItem("userId");

  const userIdParam = useParams().id;

  useEffect(() => {
    axios
      .get(`/user/${userId}`)
      .then((response) => {
        setFormData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const keyWidth = 5;
  const valueWidth = 7;

  return (
    <div>
      {userId ? (
        <div className="accForm">
          <div className="leftForm">
            <Row style={{ margin: "10px 0 2px 2px" }}>
              <h2>Account Details</h2>
            </Row>
            <Container style={{ margin: "5px" }}>
              <Row style={{ background: "#cdeac0", height: "50px" }}>
                <Col sm={keyWidth}>Account Type: </Col>
                <Col sm={valueWidth}>{formData.type}</Col>
              </Row>
              <Row style={{ height: "50px" }}>
                <Col sm={keyWidth}>Username: </Col>
                <Col sm={valueWidth}>{formData.username}</Col>
              </Row>
              <Row style={{ background: "#cdeac0", height: "50px" }}>
                <Col sm={keyWidth}>First Name: </Col>
                <Col sm={valueWidth}>{formData.firstName}</Col>
              </Row>
              <Row style={{ height: "50px" }}>
                <Col sm={keyWidth}>Family Name: </Col>
                <Col sm={valueWidth}>{formData.familyName}</Col>
              </Row>
              <Row style={{ background: "#cdeac0", height: "50px" }}>
                <Col sm={keyWidth}>Organisation: </Col>
                <Col sm={valueWidth}>{formData.organisation}</Col>
              </Row>
              <Row style={{ height: "50px" }}>
                <Col sm={keyWidth}>Contact Number: </Col>
                <Col sm={valueWidth}>{formData.contactNum}</Col>
              </Row>
              <Row style={{ background: "#cdeac0", height: "50px" }}>
                <Col sm={keyWidth}>Email Address: </Col>
                <Col sm={valueWidth}>{formData.email}</Col>
              </Row>
            </Container>
          </div>
          <div className="rightForm">
            <div className="rightLink">
              <Link to={`/user/${userId}/edit`}>
                <Button
                  variant="warning"
                  style={{
                    borderRadius: "25px",
                    padding: "6px",
                    width: "150px",
                    marginTop: "10px",
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
            </div>
            <div className="rightLink">
              <Link to={`/user/${userId}/changepassword`}>
                <Button
                  variant="warning"
                  style={{
                    borderRadius: "25px",
                    padding: "6px",
                    width: "150px",
                    marginTop: "10px",
                  }}
                >
                  Change Password
                </Button>
              </Link>
            </div>
            <div className="rightLink">
              <Link to={`/user/${userId}/delete`}>
                <Button
                  variant="danger"
                  style={{
                    borderRadius: "25px",
                    padding: "6px",
                    width: "150px",
                    marginTop: "10px",
                  }}
                >
                  Delete Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to={"/about"} />
      )}
    </div>
  );
};

export default Account;
