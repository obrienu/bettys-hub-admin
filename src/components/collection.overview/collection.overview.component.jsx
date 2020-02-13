import React, { Component } from "react";
import "./collection.overview.style.scss";
import CollectionItem from "../collection.item/collection.item.component";
import Loader from "../loader/loader.component";
import PaginateContainer from "../paginate.container/paginate.container.component";

class CollectionOverview extends Component {
  render() {
    const { shop, items, pages, activePage, paginate } = this.props;
    const header = shop.substring(0, 1).toUpperCase() + shop.substring(1);
    return items ? (
      <section className="CollectionOverview">
        <h1 className="CollectionOverviewHeader">{header}</h1>
        <div className="CollectionOverviewTop">
          {items.map(item => (
            <CollectionItem key={item._id} shop={shop} item={item} />
          ))}
        </div>
        <div className="CollectionOverviewBottom">
          <PaginateContainer
            onClick={paginate}
            active={activePage}
            pages={pages}
          />
        </div>
      </section>
    ) : (
      <Loader />
    );
  }
}

export default CollectionOverview;
