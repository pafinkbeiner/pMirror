import {useState} from 'react';
import { fb, onMessageListener, getToken } from '../Helper/firebase';
import {Button, Row, Col, Toast} from 'react-bootstrap';
import '../bootstrap.scss';

function Notify() {

    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({title: '', body: ''});
    const [isTokenFound, setTokenFound] = useState(false);
    getToken(setTokenFound);
  
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch(err => console.log('failed: ', err));
  
    return (
      <div className="Notify">
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
            position: 'absolute',
            top: 20,
            right: 20,
            minWidth: 200
          }}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{notification.title}</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>{notification.body}</Toast.Body>
          </Toast>
        <header className="Notify-header">
          {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
          {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
          <h1>TEst</h1>
          <Button onClick={() => setShow(true)}>Show Toast</Button>
        </header>
  
  
      </div>
    );
  }

  export default Notify;