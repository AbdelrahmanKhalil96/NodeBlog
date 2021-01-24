
import React from 'react';
import axios from 'axios';
import Posts from './posts'
import ReactModal from 'react-modal';
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import Slider from './slider'

/*
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};*/
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
class Home extends React.Component {

    constructor(props) {
        super(props);


        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleNewPost = (e) => {
        e.preventDefault();
        const config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        let data = new FormData(document.getElementById('newPostForm'));

        this.setState({ loading: true })
        if ((data.get('title') !== '') && (data.get('content') !== '')) {
            let postData = {
                'title': data.get('title'),
                'content': data.get('content'),
                'user_id': JSON.parse(sessionStorage.getItem('uData'))['uId'],
            }
            axios.post('http://127.0.0.1:5000/addPosts', {
                PostData: postData
            }, config).catch(function (error) {
                if (error.response) {
                    console.log("error");
                }
            })
                .then((res) => {
                    if (res.data['message']) {
                        this.setState({ message: res.data['message'], loading: false });

                        document.getElementById("newPostForm").reset();
                        setTimeout(function () {
                            this.setState({ message: '' });
                        }.bind(this), 2000);
                    }
                    let posts = res.data
                    //       console.log(posts);
                });
        }
        else {
            this.setState({ message: 'Please Fill The Data First', loading: false });
            setTimeout(function () {
                this.setState({ message: '' });
            }.bind(this), 2000);
        }

    }

    handleReRender = () => {
        this.setState({ fullyLoaded: false })
        const config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios.get(this.props.axiosUrl + '/getPosts', {

        }, config).catch(function (error) {
            if (error.response) {
                console.log("error");
            }
        })
            .then((res) => {
                let posts = res.data.posts
                //     console.log(posts);
                this.setState({ posts, fullyLoaded: true })

            });
    }
    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {


        this.setState({ showModal: false });
        this.handleReRender();
    }
    state = {
        fullyLoaded: false,
        posts: [],
        showModal: false,
        message: '',
        loading: false

    }
    componentDidMount() {
        ReactModal.setAppElement('#homeDiv');

        const config = {
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios.get(this.props.axiosUrl + '/getPosts', {

        }, config).catch(function (error) {
            if (error.response) {
                console.log("error");
            }
        })
            .then((res) => {
                let posts = res.data.posts
                //       console.log(posts);
                this.setState({ posts, fullyLoaded: true })

            });
    }
    render() {
        //  console.log(this.props)
        return (
            <div id='homeDiv'>
                <Slider />
                {
                    this.state.fullyLoaded ?
                        <div className="container" >

                            <div className='.col-sm-3'>

                                <h1 className="inner-block">Latest Posts</h1>
                                {
                                    this.props.loggedIn === 'true' &&
                                    <div className="float-md-right">
                                        <button className='btn btn-secondary' onClick={this.handleOpenModal}>Create New Post</button>
                                    </div>
                                }
                                <div>

                                    <div className="row">

                                        <Posts posts={this.state.posts} />

                                    </div>
                                    <ReactModal
                                        isOpen={this.state.showModal}
                                        contentLabel="Minimal Modal Example" style={{
                                            content: {
                                                position: 'absolute',
                                                top: '40px',
                                                left: '30%',
                                                right: '30%',
                                                bottom: '30%',
                                            }
                                            //  content: {   color: 'lightsteelblue'    }
                                        }}

                                    >
                                        <div>

                                            <div className="container center_div">

                                                <form id='newPostForm'>
                                                    <div className="form-group">
                                                        <label for="title">Title</label>
                                                        <input type="text" className="form-control" name='title' id="title" />
                                                    </div>


                                                    <div className="form-group">
                                                        <label for="content">Content</label>
                                                        <textarea className="form-control" id="content" rows="5" name='content'></textarea>
                                                    </div>
                                                    <div className="form-group" style={{ textAlign: 'center' }}>
                                                        <button className='btn btn-secondary' onClick={this.handleNewPost}>Submit</button>
                                                        <button className='btn btn-secondary' style={{ marginLeft: '10px' }} onClick={this.handleCloseModal}>Close</button>
                                                    </div> </form>
                                                <Loader style={{ textAlign: 'center' }} type="ThreeDots" color="#00BFFF" height={80} width={80} visible={this.state.loading} />
                                                <div className="form-group row"> <span style={{ color: "blue", textAlign: 'center', margin: 'auto', display: 'table' }}>{this.state.message}</span><br />
                                                </div>

                                            </div>
                                        </div>

                                    </ReactModal>
                                </div>

                            </div>
                        </div>
                        :
                        <div className="loader-container" >
                            <div className="loader"></div>
                        </div>}

            </div>
        )
    }
}
export default Home;


