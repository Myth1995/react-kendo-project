import { Dialog } from "@progress/kendo-react-dialogs";
import { Form, Field, FormElement, FormRenderProps } from "@progress/kendo-react-form";
import { Checkbox, Input } from "@progress/kendo-react-inputs";

const nameRegex: RegExp = new RegExp(/^[a-z ,.'-]+$/i);
console.log('Regex: ', nameRegex.test('asafdf'));
const userNameValidator = (value: string) => 
  !value
  ? "User Name is required" :
  nameRegex.test(value) ?
  value.length > 15 
  ? "User Name should be at least 15 characters long."
  : ""
  : "Name is not allowed to include number";

const namePartValidator = (value: string) => 
  !value
  ? "Name is required" :
  nameRegex.test(value) ?
  value.length > 25 
  ? "It should be at least 25 characters long."
  : ""
  : "Name is not allowed to include number";


const AddForm = (props) => {
  console.log("props: ", props);
  return (
    <Dialog title={props.type === 'Add' ? `Add New User` : `Enable/Disable `+props.item.UserName} onClose={props.cancelEdit}>
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.item}
        render={(formRenderProps: FormRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <fieldset className={"k-form-fieldset"}>
            {props.type === 'Add' ? 
              <div className="mb-3">
                <Field
                  name={"UserName"}
                  component={Input}
                  label={"User Name"}
                  validator={userNameValidator}
                />
              </div>
              : <></>
            }
              {props.type === 'Add' ? 
                <div>
                  <div className="mb-3">
                    <Field
                      name={"FirstName"}
                      component={Input}
                      label={"First Name"}
                      validator={namePartValidator}
                    />
                  </div>
                  <div className="mb-3">
                    <Field
                      name={"LastName"}
                      component={Input}
                      label={"Last Name"}
                      validator={namePartValidator}
                    />
                  </div>
                </div> :
                <></>}
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
              {props.type === 'Add' ?
              <button
                type={"submit"}
                className="k-button k-primary"
                disabled={!formRenderProps.allowSubmit}
              >
                {props.type}
              </button>
              : 
              <button
                type={"submit"}
                className="k-button k-primary"
              >
                {props.type}
              </button>
              }
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