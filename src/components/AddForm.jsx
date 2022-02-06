import React, {useEffect} from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Checkbox, Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error } from "@progress/kendo-react-labels";
import products from "../api/mocks.json";

const userNameValidator = (value) => 
  (value.length > 0 && value.length <= 15) ? "" : "The max length is 15 and Min is at least 0.";

const NonNegativeNumericInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <NumericTextBox {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const AddForm = (props) => {
  console.log("props: ", props);
  return (
    <Dialog title={`Add New User`} onClose={props.cancelEdit}>
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.item}
        render={(formRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <fieldset className={"k-form-fieldset"}>
              <div className="mb-3">
                <Field
                  name={"UserName"}
                  component={Input}
                  label={"User Name"}
                />
              </div>
              {props.type === 'Add' ? 
                <div>
                  <div className="mb-3">
                    <Field
                      name={"FirstName"}
                      component={Input}
                      label={"First Name"}
                      // validator={userNameValidator}
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      name={"LastName"}
                      component={Input}
                      label={"Last Name"}
                      // validator={userNameValidator}
                    />
                  </div>
                </div> :
                <div>
                  <div className="mb-3">
                    <Field
                      name={"FullName"}
                      component={Input}
                      label={"Full Name"}
                      // validator={userNameValidator}
                    />
                  </div>
                </div>}
              <div className="mb-3">
                <Field
                  name={"Enabled"}
                  component={Checkbox}
                //   component={NonNegativeNumericInput}
                  label={"Enabled"}
                />
              </div>
            </fieldset>
            <div className="k-form-buttons">
              <button
                type={"submit"}
                className="k-button k-primary"
                // disabled={!formRenderProps.allowSubmit}
                // onClick={props.onSubmit}
              >
                {props.type}
              </button>
              <button
                type={"submit"}
                className="k-button"
                onClick={props.cancelEdit}
              >
                Cancel
              </button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};
export default AddForm;