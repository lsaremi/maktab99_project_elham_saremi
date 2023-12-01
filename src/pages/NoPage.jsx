import { useRouteError } from "react-router-dom";

const NoPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* 404 */}
    </div>
  );
};

export default NoPage;
