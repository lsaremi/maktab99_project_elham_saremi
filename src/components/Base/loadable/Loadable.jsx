import React from "react";
import { Suspense } from "react";
import { Spinner } from "../../../common";

export const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
