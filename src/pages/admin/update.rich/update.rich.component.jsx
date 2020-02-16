import "./update.rich.style.scss";
import React, { Component } from "react";
import Input from "../../../components/CustomInput/custom.input.component";
import SelectInput from "../../../components/html.select/select.component";
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
import RichItem from "../../../components/rich.collection.item/richcollection.item.component";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Editor from "../../../components/texteditor/editor.component";
import { storage } from "../../../firebase/firebase";

export class UpdateRichProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      name: "",
      text: "",
      price: "",
      imageUrl: "",
      error: "",
      shop: ""
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.commId;
    const shop = match.params.shopId;
    axios
      .get(`https://bettys-api.herokuapp.com/api/${shop}/${id}`)
      .then(res => {
        let { name, imageUrl, text, shop, price, _id } = res.data;
        this.setState({
          id: _id,
          name,
          text,
          price,
          imageUrl,
          shop
        });
      })
      .catch(err => {
        this.setState({
          error: err.response.data
        });
      });
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

  deleteFromStorage = url => {
    const imageRef = url
      .substring(url.indexOf("images"), url.indexOf("?"))
      .replace(/%2f/gi, "/");
    return storage
      .ref()
      .child(imageRef)
      .delete()
      .then(() => {})
      .catch(err =>
        this.setState({
          error: "Failed to delete file"
        })
      );
  };

  handleDelete = event => {
    event.preventDefault();
    const { shop, id, imageUrl } = this.state;
    const body = { shop, id };

    this.deleteFromStorage(imageUrl)
      .then(url => {
        this.props.deleteCommodity(body);
        this.setState({
          name: "",
          description: "",
          price: "",
          category: "",
          imageUrl: "",
          shop: ""
        });
      })
      .catch(error =>
        this.setState({
          error: "Failed to delete file"
        })
      );
  };

  handleEdit = event => {
    event.preventDefault();
    const { name, shop, price, imageUrl, text, id } = this.state;
    const body = { name, shop, price, imageUrl, text, id };
    this.props.putCommodity(body);
  };

  handleEditor = value => {
    this.setState({
      text: value
    });
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
              options={["", "rich"]}
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

            {this.state.text ? (
              <Editor
                editorValue={this.state.text}
                editorChange={this.handleEditor}
              />
            ) : null}

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
          {this.state.item ? <RichItem item={this.state.item} /> : null}
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
  connect(mapStateToProps, mapDIspatchToProps)(UpdateRichProduct)
);
