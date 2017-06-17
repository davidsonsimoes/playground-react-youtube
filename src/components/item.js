import React from 'react'

const Item = ({video, onVideoSelect}) => {
  const snippet = video.snippet;
  const imageUrl = snippet.thumbnails.default.url;
  return (
    <div>
    <div className="media" onClick={() => onVideoSelect(video)}>
      <img className="d-flex mr-3" src={imageUrl} alt="{title}" />
      <div className="media-body">
        <h5 className="mt-0">{snippet.title}</h5>
        {snippet.description}
      </div>
    </div>
    <hr />
    </div>
  )
}

export default Item
