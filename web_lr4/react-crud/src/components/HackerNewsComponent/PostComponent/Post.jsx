import React from 'react';
import PropTypes from 'prop-types';
import './post.css';

const Post = ({ author, created_at, num_comments, title, points, url }) => (
  <li className="news">
    <div className="description">
      <a href={url} className="newsTitle">{title}</a>
      <span className="text">{`${points} points`}</span>
      <span className="comments">{`${num_comments} comments`}</span>
      <span className="date">{new Date(created_at).toLocaleDateString()}</span>
      <span className="author">{author}</span>
    </div>
  </li>
);

Post.propTypes = {
  author: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  num_comments: PropTypes.number,
  title: PropTypes.string,
  points: PropTypes.number,
  url: PropTypes.string,
}

Post.defaultProps = {
  author: '',
  num_comments: 0,
  title: 'Здесь должен быть заголовок',
  points: 0,
  url: '#'
}

export default Post;