import React, { useState } from 'react';

function MasterDetail({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (payload) => {
    setSelectedItem(payload);
  };

  const renderItems = () =>
    React.Children.map(children, (child) => {
      if (child.type === MasterDetail.Item) {
        return React.cloneElement(child, {
          onClick: handleItemClick,
          isSelected: selectedItem === child.props.payload,
        });
      }
      return null;
    });

  const renderDetail = () =>
    React.Children.map(children, (child) => {
      if (child.type === MasterDetail.Detail && selectedItem) {
        return child.props.children(selectedItem);
      }
      return null;
    });

  return (
    <div className="master-detail">
      <div className="master-detail__items">{renderItems()}</div>
      <div className="master-detail__detail">{renderDetail()}</div>
    </div>
  );
}

MasterDetail.Item = function MasterDetailItem({ children, payload, onClick, isSelected }) {
  const handleClick = () => {
    onClick(payload);
  };

  return (
    <div
      className={`master-detail__item${isSelected ? ' master-detail__item--selected' : ''}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

MasterDetail.Detail = function MasterDetailDetail({ children }) {
  return <div className="master-detail__detail-content">{children}</div>;
};
