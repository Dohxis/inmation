import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./Application/Application";
import * as serviceWorker from "./serviceWorker";
import "./styles/tailwind.css";
import { APIService } from "./services/APIService";

const apiService = new APIService(
  "https://vps04.inmation.eu:8002/api/v2",
  "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaW5tYXRpb24gV2ViIEFQSSJdLCJleHAiOjE1OTM2NzgzNzQsImlhdCI6MTU5MzU5MTk3NCwiaW5fcHJmIjpbIlJlYWN0VGVzdCJdLCJpbl91c3IiOiJSZWFjdFRlc3QiLCJpc3MiOiJpbm1hdGlvbiBXZWIgQVBJIiwibmJmIjoxNTkzNTkxOTc0LCJzdWIiOiJSZWFjdFRlc3QifQ.UCerUkSgRRBhWQexbJlSDZgn3zLu9e2yMI3kH3lGc9Q"
);

ReactDOM.render(
  <React.StrictMode>
    <Application apiService={apiService} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
