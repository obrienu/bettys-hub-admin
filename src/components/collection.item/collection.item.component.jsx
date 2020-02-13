import React from "react";
import "./collection.item.style.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import placeholder from "../../assets/image/placeholder.jpg";
import { clearSearchItems } from "../../redux/shop/shop.actions";
const CollectionItem = ({ item, history, clearSearchItems }) => {
  const { price, name, imageUrl, _id, shop } = item;

  const handleClick = () => {
    clearSearchItems();
    history.push(`/admin/update/${shop}/${_id}`);
  };

  return (
    <div onClick={handleClick} className="CollectionItem">
      <span className="CollectionItemFooterSale">Sale</span>

      <img
        className="CollectionItemImage"
        src={imageUrl[0] || placeholder}
        alt={name}
      />

      <div className="CollectionItemName">{name}</div>
      <div className="CollectionItemFooter">
        <span className="CollectionItemFooterPrice"> # {price}</span>
      </div>
    </div>
  );
};

const mapDispatchToState = dispatch => ({
  clearSearchItems: () => dispatch(clearSearchItems())
});

export default withRouter(connect(null, mapDispatchToState)(CollectionItem));
