import React from "react";

type Props = {
  loading: boolean;
};

export default ({ loading }: Props) =>
  loading ? <div className="spinner-border" role="status"></div> : <></>;
