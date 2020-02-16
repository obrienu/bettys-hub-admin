import "./add.rich.file.style.scss";
import React, { Component } from "react";
import Input from "../../../components/CustomInput/custom.input.component";
import SelectInput from "../../../components/html.select/select.component";
import Editor from "../../../components/texteditor/editor.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postRichProduct } from "../../../redux/shop/shop.actions";
import { StatusSelector } from "../../../redux/shop/shop.selector";
import { storage } from "../../../firebase/firebase";

export class AddRichProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      text: "",
      price: "",
      imageUrl: null,
      error: "",
      shop: "rich"
    };
  }

  putStorageItem = (item, shop) => {
    // the return value will be a Promise
    const name = Date.now() + "_" + item.name;
    return storage
      .ref(`images/${shop}/${name}`)
      .put(item)

      .then(snapshot => {
        return storage
          .ref(`images/${shop}`)
          .child(name)
          .getDownloadURL();
      })
      .catch(error =>
        this.setState({
          error: "Failed to add file"
        })
      );
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { postRichProduct } = this.props;
    const { imageUrl, text, name, price, shop } = this.state;
    this.putStorageItem(imageUrl, shop)
      .then(url => {
        postRichProduct(shop, {
          text,
          name,
          price,
          imageUrl: url,
          shop
        });
      })
      .catch(error =>
        this.setState({
          error: "Failed to add file"
        })
      );
  };

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (status !== prevProps.status) {
      this.setState({
        error: status
      });
      if (status === "Data Posted Successfully") {
        this.setState({
          name: "",
          text: "",
          price: "",
          imageUrl: null
        });
      }
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      error: ""
    });
  };

  handlefile = event => {
    const { files } = event.target;
    if (this.checkMimeType(event) && this.checkFileSize(event)) {
      this.setState({
        imageUrl: files[0],
        error: ""
      });
    }
  };

  checkMimeType = event => {
    //getting file object
    let files = event.target.files[0];

    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    // loop access array
    if (!files) {
      this.setState({
        error: "Please select an file"
      });
      return false;
    }
    // compare file type find doesn't matach
    if (types.every(type => files.type !== type)) {
      // create error message and assign to container
      err += files.type + " is not a supported format";
      event.target.value = null; // discard selected file
      this.setState({
        error: err
      });
      return false;
    }
    return true;
  };

  checkFileSize = event => {
    let files = event.target.files[0];
    if (!files) return true;
    let size = 40000;
    let err = "";
    if (files.size > size) {
      err += files.type + " is too large, please pick a smaller file";
      event.target.value = null;
      this.setState({
        error: err
      });
      return false;
    }
    return true;
  };

  handleEditor = value => {
    this.setState({
      text: value
    });
  };

  render() {
    return (
      <div className="AddCommodityForm">
        {this.state.error ? (
          <h3 style={{ width: "100%", textAlign: "center" }}>
            {this.state.error}
          </h3>
        ) : null}
        <form onSubmit={event => this.handleSubmit(event)}>
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
          <Editor editorChange={this.handleEditor} />
          <Input
            isRequired={true}
            name="imageUrl"
            onChange={event => this.handlefile(event)}
            type="file"
          />

          <input
            style={{ width: "5rem" }}
            type="submit"
            className="btn btn-info ml-5 mt-3"
            value="Submit"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  status: StatusSelector
});

const mapDIspatchToProps = dispatch => ({
  postRichProduct: (shop, body) => dispatch(postRichProduct(shop, body))
});
export default connect(mapStateToProps, mapDIspatchToProps)(AddRichProduct);
