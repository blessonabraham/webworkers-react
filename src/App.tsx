import { useEffect, useRef, useState } from 'react';
import './App.css';
import IntensiveTask from './intensiveTask';

function App() {

  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [allMessages, setAllMessages] = useState<string[]>([])

  const initiateWebWorker = () => {
    var myWorker = new Worker(IntensiveTask);

    // When you want to get messages from Worker Thread
    myWorker.onmessage = (message: any) => {
      setCurrentMessage(message.data)
    };

    // When you want to send messages to worker thread  
    myWorker.postMessage('Main Thread: Hello');
  }

  useEffect(() => initiateWebWorker(), [])

  useEffect(() => setAllMessages([...allMessages, currentMessage]), [currentMessage])

  return (
    <div className="App">
      <div className="App-header">
        <b>Web Worker Example</b>
        <p>{allMessages.map((data) => <div>{data}</div>)}</p>
      </div>
    </div>
  );
}

export default App;
