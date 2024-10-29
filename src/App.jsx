import { useState } from 'react';
import './App.css';
import callRequestData from './json/callRequest.json'
import { getAPI, postAPI } from './utils/api';

function App() {
  const [callId, setCallID] = useState('94cac7cd-627f-4edc-ba97-d6baa369ef85');
  const [details, setDetails] = useState(null);

  const callCustomer = async () => {
    const response = await postAPI('/v1/calls', callRequestData);
    console.log(response);
    if (response?.status === 'success') {
      setCallID(response.call_id);
    }
  }

  const callDetails = async () => {
    const response = await getAPI(`/v1/calls/${callId}`, callRequestData);
    setDetails(response);
  }

  return (
    <>
      <div>POC Bland AI</div>
      <button onClick={callCustomer}>Click me</button>
      {callId && <button onClick={callDetails}>Get me the call details</button>}
      {details?.transcripts?.length > 0 && details.transcripts.map(item => {
        return (
          <div className="callDetails">
            <span style={{ color: item.user === 'assistant' ? '#919191' : '#000' }}>{item.user}: </span>
            <span style={{ color: item.user === 'assistant' ? '#919191' : '#000' }}>{item.text}</span>
          </div>
        )
      })}
    </>
  );
}

export default App;
