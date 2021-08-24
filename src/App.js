
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import './App.css';
import Condidat from './components/condidateurs/Condidat';
import Home from './components/condidateurs/Home/Home';
import Admin from './components/administrator/Admin';



function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/evaluation/:id" component={Condidat} />
        <Route path="/admin" component={Admin}/>
      </Switch>
    </BrowserRouter>


  );
}

export default App;
