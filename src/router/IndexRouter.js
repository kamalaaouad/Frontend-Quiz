import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Admin from '../components/administrator/Admin';
import App from '../App';


function IndexRouter() {
    return (
        <BrowserRouter>
            <Switch>
               <Route path="/" component={App}/>
                <Route path="/admin" component={Admin}/>
            </Switch>
        </BrowserRouter>
    )
}
export default IndexRouter;