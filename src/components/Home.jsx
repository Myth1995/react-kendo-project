import * as React from "react";
import * as ReactDOM from "react-dom";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import EditForm from "./editForm.jsx";

import products from "../api/mocks.json";

const EditCommandCell = (props) => {
  return (
    <td>
      <button
        className="k-button k-primary"
        onClick={() => props.enterEdit(props.dataItem)}
      >
        Edit
      </button>
    </td>
  );
};

class Home extends React.Component {
  state = {
    openForm: false,
    editItem: {},
    data: [...products],
    result: process(products, {}),
    dataState: {},
  };

  enterEdit = (item) => {
    //   console.log("item: ", item);
      window.location.href="/" + item.ID;
    // this.setState({
    //   openForm: true,
    //   editItem: item,
    // });
  };

  handleSubmit = (event) => {
    const newData = this.state.data.map((item, i) => {
      if (event.ProductID === item.ProductID) {
        item = { ...event };
      }
      return item;
    });
    this.setState({
      data: newData,
      result: process(newData, this.state.dataState),
      openForm: false,
    });
  };

  handleCancelEdit = () => {
    this.setState({ openForm: false });
  };

  MyEditCommandCell = (props) => (
    <EditCommandCell {...props} enterEdit={this.enterEdit} />
  );

  render() {
    
    return (
      <>
        <div className="m-add">
            <button
                className="k-button k-primary"
                onClick={() => this.enterEdit(this.dataItem)}
            >
            Edit
            </button>
        </div>
        <Grid
        //   style={{ height: "520px" }}
          resizable={true}
          reorderable={true}
          filterable={true}
          sortable={true}
          pageable={{ pageSizes: true }}
          data={this.state.result}
          onDataStateChange={this.dataStateChange}
          {...this.state.dataState}
          onExpandChange={this.expandChange}
          expandField="expanded"
          editField="inEdit"
        >
          <Column
            field="ID"
            filterable={false}
            title="ID"
            width="50px"
          />
          <Column field="UserName" title="User Name" />
          <Column field="FullName" title="Full Name" filterable={false} />
          <Column
            field="LastLogin"
            title="Last Login"
            filterable={false}
          />
          <Column field="Enabled" title="Enabled" filterable={false} />
          <Column cell={this.MyEditCommandCell} filterable={false} editor="boolean" />
        </Grid>
        {this.state.openForm && (
          <EditForm
            cancelEdit={this.handleCancelEdit}
            onSubmit={this.handleSubmit}
            item={this.state.editItem}
          />
        )}
      </>
    );
  }

  dataStateChange = (event) => {
    this.setState({
      result: process(this.state.data, event.dataState),
      dataState: event.dataState,
    });
  };

  expandChange = (event) => {
    event.dataItem[event.target.props.expandField] = event.value;
    this.setState({
      result: Object.assign({}, this.state.result),
      dataState: this.state.dataState,
    });
  };
}

export default Home;