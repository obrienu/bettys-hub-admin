import React from "react";
import { Fragment } from "react";
import "./rich.product.item.style.scss";
import { withRouter } from "react-router-dom";
import Button from "../button/button.component";

const RichProductItem = ({
  name,
  text,
  imageUrl,
  isReversed,
  _id,
  history
}) => {
  const handleClick = () => {
    history.push(`/rich/products/${_id}`);
  };

  const normal = (
    <div className="RichProductItem">
      <div className="RichProductText">
        <h1 className="RichProductHeader">{name}</h1>
        <p>{text.substring(0, 400)}......</p>
        <Button onClick={handleClick} width={"6rem"} className="">
          Read More
        </Button>
      </div>

      <div className="RichProductImage">
        <img src={imageUrl} alt={name} />
      </div>
    </div>
  );

  const reversed = (
    <div className="RichProductItem">
      <div className="RichProductImage">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="RichProductText">
        <h1 className="RichProductHeaderRevered">{name}</h1>
        <p>{text.substring(0, 400)}......</p>
        <Button onClick={handleClick} width={"6rem"} className="">
          Read More
        </Button>
      </div>
    </div>
  );

  return <Fragment>{isReversed ? reversed : normal}</Fragment>;
};

export default withRouter(RichProductItem);
