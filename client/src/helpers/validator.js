// EXAMPLE USAGE:

// Validator({
//   form: "#register-form",
//   formGroupSelector: ".form-group",
//   errorSelector: ".form-message",
//   rules: [
//     Validator.isRequired("#username"),
//     Validator.isRequired("#email"),
//     Validator.isRequired("#password"),
//     Validator.isRequired("#password_confirmation"),
//     Validator.isEmail("#email"),
//     Validator.minLength("#password", 6),
//     Validator.isConfirmed(
//       "#password_confirmation",
//       () => document.querySelector("#register-form #password").value,
//       "Mật khẩu nhập lại không chính xác"
//     ),
//   ],
//   onSubmit: (data) => {
//     // Call API
//   },
// });

export default function Validator(options) {
  const getParent = (element, selector) => {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  };

  // { selector: [rule]}
  let selectorRules = {};

  // get elements of form
  let formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = (e) => {
      e.preventDefault();
      let isFormValid = true;

      // validate
      options.rules.forEach((rule) => {
        let inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // submit by javascript
        if (typeof options.onSubmit === "function") {
          let enableInputs = formElement.querySelectorAll("[name]");
          let formValues = Array.from(enableInputs).reduce((values, input) => {
            switch (input.type) {
              case "radio":
                values[input.name] = formElement.querySelector(
                  `input[name="${input.name}"]:checked`
                ).value;
                break;
              case "checkbox":
                if (!input.matches(":checked")) {
                  values[input.name] = "";
                  return values;
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = [];
                }
                values[input.name].push(input.value);
                break;
              case "file":
                values[input.name] = input.files;
                break;
              default:
                values[input.name] = input.value;
            }
            return values;
          }, {});
          options.onSubmit(formValues);
        }
        // submit by form
        else {
          formElement.submit();
        }
      }
    };

    options.rules.forEach((rule) => {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      let inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach((inputElement) => {
        // input onblur
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };

        // when user input something
        inputElement.oninput = () => {
          let errorElement = getParent(
            inputElement,
            options.formGroupSelector
          ).querySelector(options.errorSelector);
          errorElement.innerText = "";
          getParent(inputElement, options.formGroupSelector).classList.remove(
            "invalid"
          );
        };
      });
    });
  }

  const validate = (inputElement, rule) => {
    let errorElement = getParent(
      inputElement,
      options.formGroupSelector
    ).querySelector(options.errorSelector);
    let errorMessage;

    // get all rules from 1 field
    let rules = selectorRules[rule.selector];

    // get first error in 1 field
    for (let i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
          break;
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add(
        "invalid"
      );
    } else {
      errorElement.innerText = "";
      getParent(inputElement, options.formGroupSelector).classList.remove(
        "invalid"
      );
    }
    return !errorMessage;
  };
}

// define rules
// !error ? undefined : ( messageCustom || messageDefault)
Validator.isRequired = (selector, message = "Vui lòng nhập trường này!") => ({
  selector,
  test(value) {
    return value ? undefined : message;
  },
});

Validator.isEmail = (selector, message = "Vui lòng nhập email chính xác!") => ({
  selector,
  test(value) {
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? undefined : message;
  },
});

Validator.minLength = (
  selector,
  min,
  message = `Vui lòng nhập tối thiểu ${min} kí tự!`
) => ({
  selector,
  test(value) {
    return value.trim().length >= min ? undefined : message;
  },
});

Validator.isConfirmed = (
  selector,
  getConfirmValue,
  message = "Nhập lại không trùng khớp!"
) => ({
  selector,
  test(value) {
    return value === getConfirmValue() ? undefined : message;
  },
});
