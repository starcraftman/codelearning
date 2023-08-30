import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";
import { useEffect, useRef } from "react";

function NewsletterSignup() {
  const inputRef = useRef();
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  console.log('fetcher', data, state);

  useEffect(() => {
    if (state === "idle" && data && data.message) {
        window.alert(data.message);
        inputRef.current.value = "";
    }

  }, [state, data])

  return (
    <fetcher.Form
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        ref={inputRef}
        name="email"
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
