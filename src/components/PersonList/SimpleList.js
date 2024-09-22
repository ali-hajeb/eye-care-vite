import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../assets/css/skeleton-shapes.css';
import { stopPropagation } from '../../../utils/utils';
import './SimpleList.css';

const SimpleList = ({ list, link,  notFoundText }) => (
  <div className="card-block simple-list">
    <ul className="simple-list--list">
      {list || (
        <>
          <SimpleList.Skeleton />
          <SimpleList.Skeleton />
          <SimpleList.Skeleton />
        </>
      ) }
    </ul>
    {link && (
      <div className="simple-list--more">
        <Link to={link}>بیشتر ...</Link>
      </div>
    )}
  </div>
);

SimpleList.Item = ({ image, title, subTitle, onClick, checkBox, isChecked, onCheckBoxChange, id }) => {
  const onCheckBoxChangeHandler = e => {
    stopPropagation(e);
    onCheckBoxChange(e.target.id);
  }
  const onItemClickHandler = e => {
    onClick(id)
  }
  return (
  <li className="d-flex align-items-center simple-list--item" onClick={onItemClickHandler}>
    {checkBox && <input type='checkbox' id={id} className='me-2' onChange={onCheckBoxChangeHandler} checked={isChecked}/>}
    <Image
      className="simple-list--item-image me-4"
      src={image.src}
      alt={image.alt}
      roundedCircle
    />
    <div className="simple-list--item-title flex-grow-1 me-4">{title}</div>
    <div className="simple-list--item-subtitle text-truncate" title={subTitle}>
      {subTitle}
    </div>
  </li>
);}

SimpleList.Skeleton = () => (
  <li className="d-flex align-items-center simple-list--item skeleton my-0">
    <span
      className="skeleton--circle mb-3"
      style={{
        height: '2rem',
        width: '2rem',
        borderRadius: '1rem',
      }}
    ></span>
    <div className="simple-list--item-title me-4">
      <span
        className="skeleton--text mb-3"
        style={{
          height: '1.25rem',
          width: '100%',
          borderRadius: '1rem',
        }}
      ></span>
    </div>
    <div className="simple-list--item-subtitle flex-grow-1">
      <span
        className="skeleton--text mb-3"
        style={{
          height: '1.25rem',
          width: '100%',
          borderRadius: '1rem',
        }}
      ></span>
    </div>
  </li>
);

export default SimpleList;
