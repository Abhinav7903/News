import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [pageSize, setPagesize] = useState(6)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=a7cbebcf299c4f58bad9d4a67e8ac3bb&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles);
        setPagesize(pageSize);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }
    useEffect(() => {
        document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`;
        updateNews();

        // eslint-disable-next-line
    }, [])
    
    const handleback = async () => {
        setPage(page - 1);
        updateNews();
    };
    const handlenext = async () => {
            setPage(page + 1);
            updateNews();
        
        
    };
  
    
  
        return (
            <>
                <div className="container my-3">
                    <div className="text-center" style={{ margin: '40px 0px' }}><h2>Top Headlines on {capitalizeFirstLetter(props.category)} </h2></div>
                    {loading && <Spinner />}
                    
                    <div className="row">
                        {!loading && articles.map((element) => {
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
                                disabled={page <= 1}
                                className="btn btn-dark"
                                type="button"
                                onClick={handleback}
                                style={{ margin: '0px 10px 0px 0px' }}
                            >
                                &larr; Previous
                            </button>
                            <button
                                disabled={page + 1 > Math.ceil(totalResults / pageSize)}
                                className="btn btn-dark"
                                type="button"
                                onClick={handlenext}
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

News.defaultProps = {
    country: 'in',
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
}

export default News;
