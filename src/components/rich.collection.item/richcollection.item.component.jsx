import "./richcollection.item.style.scss";
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import placeholder from "../../assets/image/placeholder.jpg";
import { clearSearchItems } from "../../redux/shop/shop.actions";

const RichItem = props => {
  const { imageUrl, name, price, _id, pv } = props.item;
  const { history, clearSearchItems } = props;

  const handleClick = () => {
    clearSearchItems();
    history.push(`/admin/updaterich/rich/${_id}`);
  };

  return (
    <div onClick={handleClick} className="RichItem">
      <img className="RichItemImage" src={imageUrl || placeholder} alt={name} />

      <div className="RichItemName">{name}</div>
      <div className="RichItemPrice">
        <span className="RichItemFooterPrice"> # {price}</span>
      </div>
      {pv ? <div className="RichItemPriceTag">{pv} pv</div> : null}
    </div>
  );
};

const mapDispatchToState = dispatch => ({
  clearSearchItems: () => dispatch(clearSearchItems())
});

export default withRouter(connect(null, mapDispatchToState)(RichItem));
