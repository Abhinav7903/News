import React, { Component } from 'react'

export class NewsItem extends Component {
    

  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://media.istockphoto.com/id/938753602/pt/vetorial/vector-news-icon-newspaper-news.jpg?s=612x612&w=0&k=20&c=_tHOKiwH86nOsba61PLWIks3WcCpHz5Oyhl1LB8Lid4=":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className='card-text'>{author}</p>
                <p className="card-text">{date}</p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
                
                
                </div>

            </div>

      </div>
    )
  }
}

export default NewsItem