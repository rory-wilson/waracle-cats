import React from "react";
import { PageProps } from "gatsby";
import { Layout, Upload } from "../components";

export default function UploadRoute(props: PageProps) {
  return (
    <Layout title="Upload">
      <Upload />
    </Layout>
  );
}
