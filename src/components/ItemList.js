import React from 'react';
import ItemCard from './ItemCard';

const ItemList = ({ items, viewType, onUpdateItem }) => {
  return (
    <div className={viewType === 'grid' ? 'grid-view' : 'list-view'}>
      {items.map((item) => (
        <ItemCard key={item.imdbID} item={item} onUpdateItem={onUpdateItem} />
      ))}
    </div>
  );
};

export default ItemList;
