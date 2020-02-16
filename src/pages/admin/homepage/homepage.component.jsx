import "./homepage.style.scss";
import React, { Component } from "react";
import Input from "../../../components/CustomInput/custom.input.component";
import SelectInput from "../../../components/html.select/select.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getCategory,
  searchItems,
  clearSearchItems,
  searchRichItems
} from "../../../redux/shop/shop.actions";
import {
  categorySelector,
  searchSelector,
  searchTotalSelector
} from "../../../redux/shop/shop.selector";
import CommodityContainer from "../../../components/collection.overview/collection.overview.component";

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_param: null,
      category_list: [],
      shop: "",
      category: "",
      name: "",
      activePage: 1,
      limit: 15
    };
    this.handleCategory = this.handleCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    this.props.clearSearchItems();
  }

  async handleCategory({ target }) {
    const { name, value } = target;
    if (!value || value === "rich") {
      return this.setState({
        category_list: [],
        [name]: value
      });
    }
    await this.props.getCategory(value);
    this.setState({
      [name]: value
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  componentDidUpdate(prevProps) {
    const { categoryList } = this.props;
    if (prevProps.categoryList !== categoryList) {
      this.setState({
        category_list: categoryList
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { shop, category, name, text, limit } = this.state;
    const search_param = {
      shop,
      category,
      name,
      text
    };
    this.setState(
      currentState => ({
        search_param,
        category: "",
        name: ""
      }),
      () =>
        shop !== "rich"
          ? this.props.searchItems(this.state.search_param, limit, 1)
          : this.props.searchRichItems(this.state.search_param, limit, 1)
    );
  }

  paginate(page) {
    if (this.state.shop !== "rich") {
      this.props.searchItems(this.state.search_param, this.state.limit, page);
    } else {
      this.props.searchRichItems(
        this.state.search_param,
        this.state.limit,
        page
      );
    }
    this.setState({
      activePage: page
    });
  }

  render() {
    return (
      <div className="Homepage">
        <form onSubmit={this.handleSubmit}>
          <div className="col-md-6">
            <SelectInput
              isRequired={true}
              label="Select Shop"
              options={["", "fabric", "accessories", "rich"]}
              onChange={this.handleCategory}
              value={this.state.shop}
              name="shop"
            />
          </div>
          <div className="HomepageSearch row">
            <div className="col-lg-6">
              <Input
                isRequired={false}
                label="Search by name"
                name="name"
                onChange={event => this.handleChange(event)}
                value={this.state.name}
                type="text"
              />
            </div>
            {this.state.category_list.length > 0 ? (
              <div className="col-lg-6">
                <SelectInput
                  isRequired={false}
                  label="Select Category"
                  options={["", ...this.state.category_list]}
                  onChange={event => this.handleChange(event)}
                  value={this.state.category}
                  name="category"
                />
              </div>
            ) : null}
          </div>
          <input
            style={{ width: "5rem" }}
            type="submit"
            className="btn btn-info ml-3 mt-3"
            value="Search"
          />
        </form>
        {this.props.seachItems ? (
          <CommodityContainer
            items={this.props.seachItems}
            activePage={this.state.activePage}
            shop={this.state.search_param ? this.state.search_param.shop : null}
            pages={
              this.props.searchTotalSelector % this.state.limit === 0
                ? this.props.searchTotalSelector / this.state.limit
                : Math.trunc(
                    this.props.searchTotalSelector / this.state.limit
                  ) + 1
            }
            paginate={this.paginate}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categoryList: categorySelector,
  seachItems: searchSelector,
  searchTotalSelector: searchTotalSelector
});

const mapDIspatchToProps = dispatch => ({
  clearSearchItems: () => dispatch(clearSearchItems()),
  getCategory: shop => dispatch(getCategory(shop)),
  searchItems: (params, limit, page) =>
    dispatch(searchItems(params, limit, page)),
  searchRichItems: (params, limit, page) =>
    dispatch(searchRichItems(params, limit, page))
});
export default connect(mapStateToProps, mapDIspatchToProps)(Homepage);
