import './App.scss';
import Base from './Pages/Base';
import FirebaseTest from './Pages/FirebaseTest';

const App = () => {
  return (
    <div>
      <FirebaseTest>
        <Base color="black"/>
        <Base color="red"/>
        <Base color="green"/>
        <Base color="blue"/>
      </FirebaseTest>
    </div>
  );
};

export default App;
