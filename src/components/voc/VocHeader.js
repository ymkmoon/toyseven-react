import React from 'react';
import { Link } from 'react-router-dom';
import './VocHeader.css';

const VocHeader = props => {
  const { headersName, children } = props;

  return (
    <div className="voc-header">
        <h2 align="left">Q/A</h2>
        <Link to='/voc/question'>
            <button align="right" className="voc-view-go-list-btn" >
            게시글 작성
            </button>
        </Link>
    </div>
  )
}

export default VocHeader;