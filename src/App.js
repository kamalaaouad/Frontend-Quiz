
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import './App.css';
import Condidat from './components/condidateurs/Condidat';
import Home from './components/condidateurs/Home/Home';




function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/evaluation/:id" component={Condidat} />
      </Switch>
    </BrowserRouter>


  );
}

export default App;
