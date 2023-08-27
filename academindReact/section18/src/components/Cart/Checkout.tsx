import React from "react";

import styles from "./Checkout.module.css";

const isEmpty = (text: string) => text.trim() === "";
const isPostal = (text: string) => text.trim().length === 5;

export interface CheckoutFormType {
  name: string;
  street: string;
  postal: string;
  city: string;
}

interface CheckoutInputProps {
  id: string;
  type: string;
  errText?: string;
  children: string | number | React.ReactNode;
}
const CheckoutInput = React.forwardRef(
  (props: CheckoutInputProps, ref: any) => {
    return (
      <div className={`${styles.control} ${props.errText ? styles.invalid: ""}`}>
        <label htmlFor={props.id}>{props.children}</label>
        <input ref={ref} type={props.type} id={props.id} />
        {props.errText && <p>{props.errText}</p>}
      </div>
    );
  },
);

interface CheckoutProps {
  cancelHandler: () => void;
  submitHandler: (data: CheckoutFormType) => void;
}
const Checkout = (props: CheckoutProps) => {
  const [formValidity, setFormValidity] = React.useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInput = React.createRef<HTMLInputElement>();
  const streetInput = React.createRef<HTMLInputElement>();
  const postalInput = React.createRef<HTMLInputElement>();
  const cityInput = React.createRef<HTMLInputElement>();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const name = nameInput.current!.value;
    const street = streetInput.current!.value;
    const postal = postalInput.current!.value;
    const city = cityInput.current!.value;

    const nameValid = !isEmpty(name);
    const streetValid = !isEmpty(street);
    const postalValid = isPostal(postal);
    const cityValid = !isEmpty(city);
    const formValid = nameValid && streetValid && cityValid && postalValid;

    setFormValidity({
      name: nameValid,
      street: streetValid,
      postalCode: postalValid,
      city: cityValid,
    });

    if (!formValid) {
      return;
    }

    console.log("Submit");
    props.submitHandler({
      name,
      street,
      postal,
      city
    });
  };
  const cancelHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.cancelHandler();
  };

  return (
    <form onSubmit={submitHandler}>
      <CheckoutInput
        ref={nameInput}
        type="text"
        id="name"
        errText={formValidity.name ? "" : "Please enter a valid name."}
      >
        Your Name
      </CheckoutInput>
      <CheckoutInput
        ref={streetInput}
        type="text"
        id="street"
        errText={formValidity.street ? "" : "Please enter a valid street."}
      >
        Street
      </CheckoutInput>
      <CheckoutInput
        ref={postalInput}
        type="text"
        id="postal"
        errText={
          formValidity.postalCode ? "" : "Please enter a valid postal code."
        }
      >
        Postal Code
      </CheckoutInput>
      <CheckoutInput
        ref={cityInput}
        type="text"
        id="city"
        errText={formValidity.city ? "" : "Please enter a valid city."}
      >
        City
      </CheckoutInput>
      <div className={styles.actions}>
        <button onClick={cancelHandler} type="reset">
          Cancel
        </button>
        <button className={styles.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
