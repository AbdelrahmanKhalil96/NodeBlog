import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    render() {
        const loggedIn = this.props.loggedIn;

        return (
            <div>
                <div className="navContainer">
                    <nav className="navbar fixed-top navbar-expand-lg  bg-dark">{/**navbar-dark */}
                        <label className="navbar-brand" style={{ color: "#ddd" }}>Welcome {this.props.UName} </label>

                        <button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item"> <NavLink className="nav-link" exact
                                    to="/">Home</NavLink></li>
                                {/*}        {loggedIn &&
                                <li className="nav-item"><NavLink
                                    className="nav-link" to="/chat">Chat</NavLink></li>
                            }
                        */}
                            </ul>
                            <ul className="navbar-nav ml-auto nav-flex-icons">
                                {loggedIn === "true"
                                    ? <React.Fragment>
                                        <li className="nav-item"> <NavLink
                                            className="nav-link" to="/profile">View Profile</NavLink>
                                        </li>
                                        <li className="nav-item"> <NavLink exact
                                            className="nav-link" to="/Logout">Logout</NavLink>
                                        </li></React.Fragment>
                                    : <React.Fragment>
                                        <li className="nav-item"> <NavLink exact
                                            className="nav-link" to="/login">Login</NavLink>
                                        </li>
                                        <li className="nav-item"> <NavLink exact
                                            className="nav-link" to="/SignUp">Register</NavLink>
                                        </li>
                                    </React.Fragment>
                                }
                            </ul>
                            {/*  {%if conn %} <li className="nav-item"><a className="nav-link" href="/logout">Logout</a>
        </li>{%endif%} */}
                        </div>
                    </nav>
                </div>

                {/*                <div className="bd-example" style={{ Height: '90 px' }}>
                    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="https://introvertdear.com/wp-content/uploads/2019/07/why-INFJs-should-start-a-blog-770x470.jpg" className="d-block w-100" alt="..." />

                            </div>
                            <div className="carousel-item">
                                <img src="https://soliloquywp.com/wp-content/uploads/2018/03/slider-placement-featured.jpg" className="d-block w-100" alt="..." />

                            </div>
                            <div className="carousel-item">
                                <img src="https://landerapp.com/blog/wp-content/uploads/2018/07/How-to-Add-a-Homepage-Slider-in-WordPress.png" className="d-block w-100" alt="..." />

                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
 */}
            </div>
        );
    }


}
export default Navbar