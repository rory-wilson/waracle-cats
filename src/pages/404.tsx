import * as React from "react";
import { Link } from "gatsby";
import { Layout } from "../components";

const NotFoundPage = () => {
  return (
    <Layout title="Not found">
      <p>
        Page not found. Please return to the <Link to="/">home page</Link>
      </p>
    </Layout>
  );
};

export default NotFoundPage;
