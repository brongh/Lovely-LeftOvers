import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// import "./style.css";
// https://bit.ly/3c4kYL1

const FoodCard = ({ foodData }) => {
  return (
    <Card
      style={{
        width: "20rem",
        margin: "10px 0px",
        background: "rgba(255,255,255,0.85)",
      }}
      border="info"
    >
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title
          style={{
            marginBottom: "25px",
            marginTop: "-15px",
            fontSize: "22px",
            textDecoration: "underline",
          }}
        >
          {foodData.title}
        </Card.Title>
        <div className="textWrap">
          <Card.Text style={{ marginBottom: "-1px" }}>
            Quantity: <span style={{ color: "blue" }}>{foodData.quantity}</span>
          </Card.Text>
          <Card.Text>
            Best Before:
            <span style={{ color: "red" }}>
              <Moment format="DD/MM/YYYY">{foodData.bestBefore}</Moment>{" "}
            </span>
          </Card.Text>
          <Card.Link href={`/listings${foodData.queryPath}`}>
            View Listing
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FoodCard;
