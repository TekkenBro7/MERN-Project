import React, { Component } from "react";
import './hackerNews.css';
import Post from './PostComponent/Post';
import Pagination from "./PaginationComponent/Pagination";

const BASE_PATH = 'https://hn.algolia.com/api/v1';
const SEARCH_PATH = '/search';
const SEARCH_PARAM = 'query=';
const PAGE_HITS = 'hitsPerPage='
const PAGE_PARAM = 'page=';


const HITS = [
    { value: 10, label: 10, },
    { value: 20,label: 20, },
    { value: 30, label: 30, },
    { value: 40, label: 40, },
    { value: 50, label: 50, }
];

class News extends Component {
    state = {
        searchQuery: '',
        result: {},
        hitsPerPage: 20,
        page: 0,
    }
    componentDidMount() {
        const { searchQuery, hitsPerPage, page } = this.state;
        this.fetchData(searchQuery, hitsPerPage, page);
    }
    fetchData = (searchQuery, hitsPerPage, page) => {
        fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}&${PAGE_HITS}${hitsPerPage}&${PAGE_PARAM}${page}`)
          .then(res => res.json())
          .then(result => this.setNews(result))
          .catch(error => error);
    }
    handleInputChange = ({ target: { value } }) => {
        this.setState({
            searchQuery: value
        })
    } 
    handleHitsChange = ({ target: { value } }) => {
        const { searchQuery } = this.state
        this.setState({
            hitsPerPage: +value,
            page: 0,
        }, () => {
            this.fetchData(searchQuery, this.state.hitsPerPage, 0);
        })      
    } 
    getSearch = ({ key }) => {
        if(key === 'Enter') {
            const { searchQuery, hitsPerPage } = this.state;
            this.setState({
                page: 0,
            })
            this.fetchData(searchQuery, hitsPerPage, 0);
        }
    }
    setNews = result => {
        this.setState({ result });
    }

    handlePageChange = ({ target }) => {
        const btnType = target.getAttribute('data-name');
        let { page } = this.state;
    
        if(!isNaN(btnType)) {
            this.updatePage(+btnType);
        } else {
            switch (btnType) {
                case 'next':
                    this.updatePage(page + 1);
                    break;
                case 'prev':
                    this.updatePage(page - 1);
                    break;
                default: break;
            }
        }
    }

    updatePage = (number) => {
        const { searchQuery, hitsPerPage } = this.state;
        this.setState({
          page: number,
        }, () => {
          this.fetchData(searchQuery, hitsPerPage, number);
        })
      }

    render() {
        const { searchQuery, result, hitsPerPage } = this.state;
        const { hits = [], page, nbPages } = result;

        return (
            <div className="wrapper">
                <h1>Хакер новости</h1>
                <div className="inputWrapper">
                    <i className="fas fa-search" />
                    <input
                    className="input"
                    placeholder="Поиск новостей..."
                    onChange={this.handleInputChange}
                    onKeyPress={this.getSearch}
                    value={searchQuery}
                    />
                </div>
                <div className="selectWrapper">
                    <select onChange={this.handleHitsChange} value={hitsPerPage}>
                        {HITS.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                    <span className="selectText">per page</span>
                </div>
                <Pagination 
                    onClick={this.handlePageChange}
                    page={page}
                    lastPage={nbPages}
                    />
                <ul className="newsList">
                {hits.map(({ author, created_at, num_comments, objectID, title, points, url }) =>
                    <Post
                    key={objectID}
                    author={author}
                    created_at={created_at}
                    num_comments={num_comments}
                    title={title}
                    points={points}
                    url={url}
                    />
                )}
                </ul>
            </div>
        );
    }
}

export default News;
