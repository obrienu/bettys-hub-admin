import React, { Component } from "react";
import Input from "../../../components/CustomInput/custom.input.component";
import SelectInput from "../../../components/html.select/select.component";
import TextArea from "../../../components/custom.textarea/custom.textarea.component";
//import axios from "axios";
import Editor from "../../../components/texteditor/editor.component";
import "./add.file.style.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postCommodity } from "../../../redux/shop/shop.actions";
import { StatusSelector } from "../../../redux/shop/shop.selector";
import { storage } from "../../../firebase/firebase";

export class AddFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      category: "",
      files: [],
      error: "",
      shop: ""
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
    const { postComm } = this.props;
    const { files, description, name, price, category, shop } = this.state;
    Promise.all(
      // Array of "Promises"
      files.map(item => this.putStorageItem(item, shop))
    )
      .then(url => {
        postComm(shop, {
          description,
          name,
          price,
          category,
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
          description: "",
          price: "",
          category: "",
          files: [],
          shop: ""
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
    const { files, name } = event.target;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      let newFiles = this.state.files;
      switch (name) {
        case "image1":
          if (!files[0]) {
            newFiles = newFiles.filter((file, index) => index !== 0);
          } else {
            newFiles[0] = files[0];
          }

          this.setState({
            files: [...newFiles],
            error: ""
          });
          break;
        case "image2":
          if (!files[0]) {
            newFiles = newFiles.filter((file, index) => index !== 1);
          } else {
            newFiles[1] = files[0];
          }

          this.setState({
            files: [...newFiles],
            error: ""
          });
          break;
        case "image3":
          if (!files[0]) {
            newFiles = newFiles.filter((file, index) => index !== 2);
          } else {
            newFiles[2] = files[0];
          }

          this.setState({
            files: [...newFiles],
            error: ""
          });
          break;
        default:
          this.setState({
            ...this.state
          });
      }
    }
  };

  maxSelectFile = event => {
    let files = this.state.files; // create file object
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null; // discard selected file
      this.setState({
        error: msg
      });
      return false;
    }
    return true;
  };

  checkMimeType = event => {
    //getting file object
    let files = event.target.files[0];
    if (!files) return true;
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    // loop access array

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
    let size = 30000;
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
      description: value
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
          {/*  <TextArea
            placeholder="Description"
            isRequired={true}
            name="description"
            onChange={event => this.handleChange(event)}
            value={this.state.description}
          /> */}
          <Editor editorChange={this.handleEditor} />
          <Input
            isRequired={true}
            name="image1"
            onChange={event => this.handlefile(event)}
            value={this.state.image1}
            type="file"
          />
          <Input
            name="image2"
            onChange={event => this.handlefile(event)}
            value={this.state.image2}
            type="file"
          />
          <Input
            name="image3"
            onChange={event => this.handlefile(event)}
            value={this.state.image3}
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
  postComm: (shop, body) => dispatch(postCommodity(shop, body))
});
export default connect(mapStateToProps, mapDIspatchToProps)(AddFile);
