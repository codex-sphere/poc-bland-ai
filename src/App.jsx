import { useState } from "react";
import "./App.css";
import callRequestData from "./json/callRequest.json";
import { getAPI, postAPI, getServerAPI } from "./utils/api";

function App() {
  const [callId, setCallID] = useState("");
  const [details, setDetails] = useState(null);
  const [callDetailLog, setCallDetailLog] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const callCustomer = async () => {
    if (!phoneNumber) return null;
    const response = await postAPI("/v1/calls", {
      ...callRequestData,
      phone_number: phoneNumber,
    });
    if (response?.status === "success") {
      setCallID(response.call_id);
    }
  };

  const callDetails = async () => {
    const response = await getAPI(`/v1/calls/${callId}`, callRequestData);
    setDetails(response);
  };

  const getCallDetails = async () => {
    const response = await getServerAPI(
      `https://bland-dev-api.azurewebsites.net/GetPatientDetails`
    );
    debugger;
    setCallDetailLog(response);
  };

  return (
    <>
      <div className="ai-container">
        <h1 className="ai-header">POC Bland AI</h1>
        <div>
          <label>Input Phone Number</label>
          <span>&nbsp;</span>
          <input
            className="ai-input"
            type="text"
            placeholder="Please enter phone number"
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <button className="ai-btn" onClick={callCustomer}>
          Call me
        </button>
        <hr />
        <div>
          <button className="ai-btn" onClick={getCallDetails}>
            Get me the call details
          </button>
        </div>
        <div>
          {/* Call detail Log */}
          <table>
            <thead>
              <th className="ai-th">Patient Name</th>
              <th className="ai-th">Phone Number</th>
              <th className="ai-th">Date of Birth</th>
            </thead>
            <tbody>
              {callDetailLog.length > 0 &&
                callDetailLog.map((callLog) => {
                  return (
                    <tr>
                      <td>{callLog.patientName}</td>
                      <td>{callLog.phoneNumber}</td>
                      <td>{callLog.dateOfBirth}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* {details?.transcripts?.length > 0 &&
          details.transcripts.map((item) => {
            return (
              <div className="callDetails">
                <span
                  style={{
                    color: item.user === "assistant" ? "#919191" : "#000",
                  }}
                >
                  {item.user}:{" "}
                </span>
                <span
                  style={{
                    color: item.user === "assistant" ? "#919191" : "#000",
                  }}
                >
                  {item.text}
                </span>
              </div>
            );
          })} */}
      </div>
    </>
  );
}

export default App;
