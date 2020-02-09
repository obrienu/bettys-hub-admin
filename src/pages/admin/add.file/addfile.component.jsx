import React, { Component } from "react";
import Input from "../../../components/CustomInput/custom.input.component";
import SelectInput from "../../../components/html.select/select.component";
//import TextArea from "../../../components/custom.textarea/custom.textarea.component";
import axios from "axios";
import Editor from "../../../components/texteditor/editor.component";
import "./add.file.style.scss";

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

  handleSubmit = event => {
    event.preventDefault();

    var data = new FormData();

    for (let i = 0; i < this.state.files.length; i++) {
      data.append("files", this.state.files[i]);
    }
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("category", this.state.category);
    data.append("name", this.state.name);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    axios
      .post(`/api/${this.state.shop}`, data, config)
      .then(res => {
        this.setState({
          name: "",
          description: "",
          price: "",
          category: "",
          files: [],
          error: "",
          shop: ""
        });
        console.log(res.data);
      })
      .catch(err => {
        this.setState({
          name: "",
          description: "",
          price: "",
          category: "",
          files: [],
          error: "",
          shop: ""
        });
        console.log(err);
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
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
          newFiles[0] = files[0];
          this.setState({
            files: [...newFiles]
          });
          break;
        case "image2":
          newFiles[1] = files[0];
          this.setState({
            files: [...newFiles]
          });
          break;
        case "image3":
          newFiles[2] = files[0];
          this.setState({
            files: [...newFiles]
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
    let files = event.target.files[0]; // create file object
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
    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
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

  getEditorContent = content => {
    this.setState({
      description: content
    });
  };

  render() {
    return (
      <div className="AddCommodityForm">
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
          {/* <TextArea
            placeholder="Description"
            isRequired={true}
            name="description"
            onChange={event => this.handleChange(event)}
            value={this.state.description}
          /> */}
          <Editor getEditorContent={this.getEditorContent} />
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

export default AddFile;
