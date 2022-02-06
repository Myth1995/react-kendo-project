import * as React from "react";
import * as ReactDOM from "react-dom";

import { Grid, GridColumn as Column, GridRowProps } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import AddForm from "./AddForm.jsx";

import userList from "../api/mocks.json";

const EditCommandCell = (props) => {
  return (
    <td>
      <button
        className="k-button k-primary"
        onClick={() => props.enterEdit(props.dataItem)}
      >
        Detail
      </button>
    </td>
  );
};

class Home extends React.Component {
  state = {
    openForm: false,
    addItem: {},
    data: [...userList],
    result: process(userList, {}),
    dataState: {},
  };

  enterEdit = (item) => {
    console.log("Eidt: ", item);
    window.location.href = '/' + item.ID;
  }

  enterAdd = () => {
    this.setState({
      openForm: true,
      addItem: {},
    });
  };

  handleSubmit = (event) => {
    //   console.log("event: ", event);
      let date = new Date();
      date = date.toLocaleDateString();
      this.state.data.push({ID: this.state.data.length + 1, LastLogin: date, FullName: event.FirstName + " " + event.LastName, UserName: event.UserName, Enabled: event.Enabled})
      const newData = this.state.data.map((item, i) => {

    //   if (event.ID === item.ID) {
    //     item = { ...event };
    //   }
      return item;
    });
    this.setState({
      data: newData,
      result: process(newData, this.state.dataState),
      openForm: false,
    });
  };

  handleCancelAdd = () => {
    this.setState({ openForm: false });
  };

  MyEditCommandCell = (props) => (
    <EditCommandCell {...props} enterEdit={this.enterEdit} />
  );
  rowRender(
    trElement: React.ReactElement<HTMLTableRowElement>,
    props: GridRowProps
  ) {
    const available = props.dataItem.Enabled;
    const normal = { color: "black" };
    const red = { color: "red" };
    const trProps: any = { style: available ? normal : red };
    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  }
  render() {
    
    return (
      <div className="home">
        <div className="m-add my-5 mr-5">
            <button
                className="k-button k-primary"
                onClick={() => {
                    this.enterAdd()
                }}
            >
            New User
            </button>
        </div>
        <Grid
          style={{ height: "490px" }}
        //   resizable={true}
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
          rowRender={this.rowRender}
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
          <Column cell={this.MyEditCommandCell} filterable={false} />
        </Grid>
        {this.state.openForm && (
          <AddForm
            cancelEdit={this.handleCancelAdd}
            onSubmit={this.handleSubmit}
            item={this.state.addItem}
          />
        )}
      </div>
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