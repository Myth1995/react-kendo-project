import React, { Component } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import products from "../api/mocks.json";


const len = window.location.pathname.length;
const id = parseInt(window.location.pathname.slice(1, len));
console.log('id: ', id)
const item = products[id-1];
console.log('data: ', item)

export default class Detail extends Component {

  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    
  }

  BackToHome() {
    window.location.href = '/';
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="fs-10">Detail about {item.UserName} </div>
        <Form
          initialValues={item}
          render={(formRenderProps) => (
            <FormElement style={{ maxWidth: 300, margin: "auto" }}>
              <fieldset className={"k-form-fieldset"}>
                <div className="mb-3">
                  <Field
                    name={"UserName"}
                    component={Input}
                    label={"User Name"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"FullName"}
                    component={Input}
                    label={"Full Name"}
                  //   validator={minValueValidator}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"LastLogin"}
                    component={Input}
                  //   component={NonNegativeNumericInput}
                    label={"Last Login"}
                  //   validator={minValueValidator}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"Enabled"}
                    component={Checkbox}
                  //   component={NonNegativeNumericInput}
                    label={"Enabled"}
                  //   validator={minValueValidator}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                {/* <button
                  type={"submit"}
                  className="k-button k-primary"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Update
                </button> */}
                <button
                  type={"submit"}
                  className="k-button"
                  onClick={this.BackToHome}
                >
                  Cancel
                </button>
              </div>
            </FormElement>
          )}
        />
      </div>
    );
  }
};
