import * as React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Grid, GridColumn as Column, GridRowProps, GridPageChangeEvent } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import AddForm from "./AddForm.jsx";

// import userList from "../api/mocks.json";
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

interface HomeState {
    openForm: boolean;
    formType: string;
    dataItem: object;
    data: array;
    result: any;
    dataState: object;
    skip: number;
    take: number;
}


class Home extends React.Component {
    constructor(props) {
        super(props);

        console.log("props: ", props);
    }

  state : HomeState = {
    openForm: false,
    formType: "",
    dataItem: {},
    data: [this.props.userList],
    result: process(this.props.userList, {take: 10, skip: 0}),
    dataState: {},
    skip: 0,
    take: 10,
  };

  enterEdit = (item) => {
    this.setState({
        openForm: true,
        dataItem: item,
        formType: "Edit"
      });
  }

  enterAdd = () => {
    this.setState({
      openForm: true,
      dataItem: {UserName: '', Enabled: false},
      formType: "Add"
    });
  };

  handleSubmit = (event) => {
    //   debugger
    //   console.log("event: ", event);
    let newData = [];
    if(this.state.formType === "Add") {
        let date = new Date();
        date = date.toLocaleDateString();
        this.props.userList.push({ID: this.props.userList.length + 1, LastLogin: date, FullName: event.FirstName + " " + event.LastName, UserName: event.UserName, Enabled: event.Enabled})
        newData = this.props.userList.map((item, i) => {
            return item;
        });
    }
    else {
        newData = this.props.userList.map((item, i) => {
            if (event.ID === item.ID) {
                item.Enabled = { ...event.Enabled };
            }
            return item;
        });
    }
    this.setState({
      data: newData,
      result: process(newData, this.state.dataState),
      openForm: false,
    });

    toast.success(this.state.formType + " process successfully done!");
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
    const trProps: object = { style: available ? normal : red };
    return React.cloneElement(
      trElement,
      { ...trProps },
      trElement.props.children
    );
  }

  pageChange = (event: GridPageChangeEvent) => {
      console.log("pageChange: ", event.page);
    
    this.setState({
      skip: event.page.skip,
      take: event.page.take,
      result: process(this.props.userList, {skip: event.page.skip, take: event.page.take})
    //   result: process(pageData, {})
    });
  };

  render() {
    
    return (
      <div className="home">
        <div><Toaster toastOptions={{className : 'm-toaster', duration : 3000, style : { fontSize: '12px' }}}/></div>
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
          style={{ height: "490px", cursor: "pointer" }}
        //   resizable={true}
          reorderable={true}
          filterable={true}
          sortable={true}
          pageable={true}
          skip={this.state.skip}
          take={this.state.take}
          total={this.props.userList.length}
          onPageChange={this.pageChange}
          data={this.state.result}
          onDataStateChange={this.dataStateChange}
          {...this.state.dataState}
          onExpandChange={this.expandChange}
          expandField="expanded"
          editField="inEdit"
          rowRender={this.rowRender}
          onRowClick={this.rowClick}
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
          <Column field="Enabled" title="Enabled" editor="boolean" filterable={false} />
          <Column cell={this.MyEditCommandCell} filterable={false} />
        </Grid>
        {this.state.openForm && (
          <AddForm
            cancelEdit={this.handleCancelAdd}
            onSubmit={this.handleSubmit}
            item={this.state.dataItem}
            type={this.state.formType}
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

  rowClick = (event) => {
    window.location.href = '/' + event.dataItem.ID;
  }
}

export default Home;