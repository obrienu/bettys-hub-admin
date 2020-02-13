import React, { Component, Fragment } from "react";
import "./rich.product.container.style.scss";
import { connect } from "react-redux";
import { getRich } from "../../redux/rich/rich.action";
import { richProductSelector } from "../../redux/rich/rich.selection";
import { createStructuredSelector } from "reselect";
import Loader from "../loader/loader.component";
import RichProductItem from "../rich.collection.item/richcollection.item.component";
import PaginateContainer from "../paginate.container/paginate.container.component";

export class RichProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      pages: 0,
      activePage: 1
    };

    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
    const { getRich } = this.props;
    getRich();
  }

  componentDidUpdate(prevProps) {
    const { products } = this.props;
    if (prevProps.products !== products) {
      const pages = Math.trunc(products.length / 12) + 1;
      this.setState({
        items: [...products.filter((item, index) => index <= 11)],
        pages
      });
    }
  }

  paginate(page) {
    const { products } = this.props;
    const start = (page - 1) * 12;
    const finish = start + 12;
    const items = products.slice(start, finish);
    this.setState({
      ...this.state,
      items,
      activePage: page
    });
  }

  render() {
    const { items, pages, activePage } = this.state;
    return (
      <div className="RichProductContainer">
        <header className="RichProductContainerHeader">Rich Products</header>
        {items.length > 0 ? (
          <Fragment>
            <div className="RichProductContainerProducts">
              {items.map(product => (
                <RichProductItem key={product._id} {...product} />
              ))}
            </div>
            <PaginateContainer
              onClick={this.paginate}
              active={activePage}
              pages={pages}
            />
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  products: richProductSelector
});

const mapDispatchToProps = dispatch => ({
  getRich: () => dispatch(getRich())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RichProductContainer);
