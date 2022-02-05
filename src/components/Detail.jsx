import React, { Component } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import products from "../api/mocks.json";


export default class Detail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="fs-10">Detail about </div>
        <Form
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
              </fieldset>
              <div className="k-form-buttons">
                <button
                  type={"submit"}
                  className="k-button k-primary"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Update
                </button>
                <button
                  type={"submit"}
                  className="k-button"
                  // onClick={props.cancelEdit}
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
