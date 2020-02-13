import React, { Component } from "react";
import Input from "../../../components/CustomInput/custom.input.component";
import SelectInput from "../../../components/html.select/select.component";
import TextArea from "../../../components/custom.textarea/custom.textarea.component";
import "./update.file.style.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  putCommodity,
  deleteCommodity
} from "../../../redux/shop/shop.actions";
import {
  StatusSelector,
  itemSelector
} from "../../../redux/shop/shop.selector";
import CollectionItem from "../../../components/collection.item/collection.item.component";
import { withRouter } from "react-router-dom";
import axios from "axios";

export class AddFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: [],
      error: "",
      shop: ""
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.commId;
    const shop = match.params.shopId;
    axios
      .get(`/api/${shop}/${id}`)
      .then(res => {
        const {
          name,
          imageUrl,
          description,
          shop,
          category,
          price,
          _id
        } = res.data;
        this.setState({
          id: _id,
          name,
          description,
          price,
          category,
          imageUrl,
          shop
        });
      })
      .catch(err =>
        this.setState({
          error: err.response.data
        })
      );
  }

  componentDidUpdate(prevProps) {
    const { status, item } = this.props;
    if (status !== prevProps.status) {
      this.setState({
        error: status
      });
    }

    if (item !== prevProps.item) {
      this.setState({
        item
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      error: ""
    });
  };

  handleDelete = event => {
    event.preventDefault();
    const { shop, id } = this.state;
    const body = { shop, id };
    this.props.deleteCommodity(body);
    this.setState({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: [],
      shop: ""
    });
  };

  handleEdit = event => {
    event.preventDefault();
    const {
      name,
      shop,
      price,
      imageUrl,
      description,
      category,
      id
    } = this.state;
    const body = { name, shop, price, imageUrl, description, category, id };
    this.props.putCommodity(body);
  };

  render() {
    return (
      <div className="AddCommodity">
        <div className="AddCommodityForm">
          {this.state.error ? (
            <h3 style={{ width: "100%", textAlign: "center" }}>
              {this.state.error}
            </h3>
          ) : null}
          <form onSubmit={event => this.handleSubmit(event)}>
            <SelectInput
              isRequired={true}
              label="Selected Shop"
              options={["", "fabric", "accessories"]}
              onChange={event => this.handleChange(event)}
              value={this.state.shop}
              name="shop"
            />
            <Input
              isRequired={true}
              name="name"
              onChange={event => this.handleChange(event)}
              value={this.state.name}
              type="text"
            />
            <Input
              isRequired={true}
              name="price"
              onChange={event => this.handleChange(event)}
              value={this.state.price}
              type="number"
            />
            <Input
              isRequired={true}
              name="category"
              onChange={event => this.handleChange(event)}
              value={this.state.category}
              type="text"
            />
            <TextArea
              placeholder="Description"
              isRequired={true}
              name="description"
              onChange={event => this.handleChange(event)}
              value={this.state.description}
            />

            <input
              onClick={this.handleEdit}
              style={{ width: "5rem" }}
              type="submit"
              className="btn btn-info ml-5 mt-3"
              value="Edit"
            />
            <input
              onClick={this.handleDelete}
              style={{ width: "5rem" }}
              type="submit"
              className="btn btn-danger ml-5 mt-3"
              value="Delete"
            />
          </form>
        </div>
        <div className="AddCommodityItem">
          {this.state.item ? <CollectionItem item={this.state.item} /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  item: itemSelector,
  status: StatusSelector
});

const mapDIspatchToProps = dispatch => ({
  putCommodity: body => dispatch(putCommodity(body)),
  deleteCommodity: body => dispatch(deleteCommodity(body))
});
export default withRouter(
  connect(mapStateToProps, mapDIspatchToProps)(AddFile)
);
