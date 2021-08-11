import React,{useState} from 'react'
import './Admin.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../questionnaire.png';
import ModalQuiz from '../modal/ModalQuiz';
import ModalQuestion from '../modal/ModalQuestion';
import ListQuiz from './ListQuiz';
import QuizWithQuestion from '../quiz/QuizWithQuestion';
import EditQuiz from '../quiz/EditQuiz';
function Admin() {
    const [showQt, setShowQt] = useState(false);
    const [showQz, setShowQz] = useState(false);

    const showModalQz=()=>{
        setShowQz(!showQz);
    }
    const showModalQt=()=>{
        setShowQt(!showQt);
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={logo} className="App-logo" alt="logo" width="30" height="24" />
                        Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/modal"><i className="fa fa-flag"></i> Add Quiz</Nav.Link>
                            <Nav.Link href="/"><i className="fa fa-file"></i> List Quiz</Nav.Link>
                            <Nav.Link href="/modalquestion"><i className="fa fa-cogs"></i> Add Question</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets"><i className="fa fa-user fa-fw"></i>Kamal</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                            <i className="fa fa-sign-out"></i> LogOut
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            <div className="container-fluid">
                <div className="row min-vh-100 flex-column flex-md-row">
                    <aside className="col-12 col-md-2 p-0 bg-dark flex-shrink-1">
                        <nav className="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start py-2">
                            <div className="collapse navbar-collapse ">
                                <ul className="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                                    <li className="nav-item">
                                        <a className="nav-link pl-0 text-nowrap" href='/'><i className="fa fa-bullseye fa-fw"></i> <span className="font-weight-bold">Quiz_Admin</span></a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className="nav-link pl-0" href='/#'><i className="fa fa-book fa-fw"></i> <span className="d-none d-md-inline">Link</span></a>
                                    </li> */}
                                    <li className="nav-item">
                                        <a className="nav-link pl-0"
                                        onClick={()=>{showModalQz()}}
                                         href='/#'><i className="fa fa-flag"></i> <span className="d-none d-md-inline">ADD QUIZ</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pl-0"
                                         onClick={()=>{showModalQt()}}
                                         href='/#'><i className="fa fa-cogs"></i> <span className="d-none d-md-inline">ADD QUESTION</span></a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className="nav-link pl-0" href='/#'><i className="fa fa-cog fa-fw"></i> <span className="d-none d-md-inline">Link</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pl-0" href='/#'><i className="fa fa-heart codeply fa-fw"></i> <span className="d-none d-md-inline">Codeply</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pl-0" href='/#'><i className="fa fa-star codeply fa-fw"></i> <span className="d-none d-md-inline">Link</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link pl-0" href='/#'><i className="fa fa-star fa-fw"></i> <span className="d-none d-md-inline">Link</span></a>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                    </aside>
                    <main className="col bg-faded py-3 flex-grow-1">
                        <ModalQuiz
                            onCloseQz={(e)=>showModalQz(e)}
                            showQz={showQz}
                        />
                        <ModalQuestion
                        onCloseQt={(e)=>showModalQt(e)}
                        showQt={showQt}
                        />
                        {/* <EditQuiz/> */}
                        <BrowserRouter>
                        <Switch>
                            <Route path="/" component={ListQuiz} exact/>
                            <Route path="/quiz/:id" component={QuizWithQuestion}/> 
                            <Route path="/editquiz/:id" component={EditQuiz}/> 
                        </Switch>
                        </BrowserRouter>
                    </main>
                </div>
            </div>
        </>

    )
}

export default Admin
