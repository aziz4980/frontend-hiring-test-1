import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { useNavigate } from "react-router-dom";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";
import axios from "axios";

export default function Home() {
  const [callItems, setCallItems] = useState([]);
  const [access_token, setAccess_token] = useState(
    sessionStorage.getItem("access_token")
  );
  const [pageCount, setpageCount] = useState(0);
  const [archive, setArchive] = useState(false);
  const limit = 10;
  const navigate = useNavigate();

  useEffect(async () => {
    await axios({
      url: `https://frontend-test-api.aircall.io/calls?offset=0&limit=${limit}`,
      method: "GET",
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => {
        // console.log(data);
        setpageCount(Math.ceil(response.data.totalCount / limit));
        setCallItems(response.data.nodes);
      })
      .catch((error) => {
        console.log(error);
        alert("Your session has expired!");
        sessionStorage.removeItem("access_token");
        navigate("/");
      });
  }, [archive]);

  setInterval(() => {
    axios({
      url: "https://frontend-test-api.aircall.io/auth/refresh-token",
      method: "POST",
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => {
        sessionStorage.setItem("access_token", response.data.access_token);
        setAccess_token(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
        alert("Looks like you aren't connected to the internet!");
      });
  }, 59980);

  return !callItems.length ? (
    <div className="center container">
      <Dots />
    </div>
  ) : (
    <Pagination
      callItems={callItems}
      totalPages={pageCount}
      limit={limit}
      archive={archive}
      setArchive={setArchive}
    ></Pagination>
  );
}
