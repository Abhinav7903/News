import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
export class News extends Component {


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
    constructor(props) {
        super();
        // console.log("Hello I am a constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
        document.title = `${this.capitalizeFirstLetter(props.category)} - NewsApp`;

    }
        
    

    async updateNews() {
        const url =
            `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5fb257fcabbb46738bd92a383ba74b52&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount() {
       this.updateNews();
    }

    handlback = async () => {
        this.setState({ loading: false, page: this.state.page - 1,  });
        this.updateNews();
    };
    handlenext = async () => {
        // console.log("Next");
        // if (!this.state.page + 1 > Math.ceil(this.state.totalResults / 5)) {
        //     alert("No more pages as per api 😔");
        // } else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5fb257fcabbb46738bd92a383ba74b52&page=${this.state.page + 1
        //         }&pageSize=${this.props.pagesize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //     });
        // }

        this.setState({ loading: false, page: this.state.page + 1  });
        this.updateNews();
    };

    render() {
        return (
            <>
                <div className="container my-3">
                    <div className="text-center" style={{ margin: '40px 0px' }}><h2>Top Headlines on {this.capitalizeFirstLetter(this.props.category)} </h2></div>
                    {this.state.loading && <Spinner />}


                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            const publishedDate = new Date(element.publishedAt);

                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={
                                            element.title
                                                ? element.title.slice(0, 45)
                                                : "Default Title"
                                        }
                                        description={
                                            element.description
                                                ? element.description.slice(0, 88)
                                                : "Default Description"
                                        }
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={publishedDate.toLocaleString()}
                                    />
                                </div>
                            );
                        })}

                        <div className="container d-flex justify-content-between">
                            <button
                                disabled={this.state.page <= 1}
                                className="btn btn-dark"
                                type="button"
                                onClick={this.handlback}
                                style={{ margin: '0px 10px 0px 0px' }}
                            >
                                &larr; Previous
                            </button>
                            <button
                                disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)}
                                className="btn btn-dark"
                                type="button"
                                onClick={this.handlenext}
                                style={{ margin: '0px 0px 0px 10px' }}
                            >
                                Next &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;
