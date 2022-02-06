import { Component } from "react";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Checkbox, Input } from "@progress/kendo-react-inputs";
import products from "../api/mocks.json";


const len = window.location.pathname.length;
const id = parseInt(window.location.pathname.slice(1, len));
console.log('id: ', id)
const item = products[id-1];
console.log('data: ', item)

export default class Detail extends Component {

  BackToHome() {
    window.location.href = '/';
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="fs-10">Detail about {item.UserName} </div>
        <Form
          initialValues={item}
          render={() => (
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
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"LastLogin"}
                    component={Input}
                    label={"Last Login"}
                  />
                </div>
                <div className="mb-3">
                  <Field
                    name={"Enabled"}
                    component={Checkbox}
                    label={"Enabled"}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
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
