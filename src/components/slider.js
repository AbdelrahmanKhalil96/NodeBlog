import React from 'react';

const Slider = () => {
    return (
        <div>

            <div className="bd-example" style={{ Height: '90 px' }}>
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
        </div>
    )
}

export default Slider