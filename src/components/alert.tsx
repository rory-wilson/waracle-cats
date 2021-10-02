import React from "react";

export enum AlertType {
  danger = "danger",
  warning = "warning",
  success = "success",
}
type Props = {
  children: React.ReactNode;
  type?: AlertType;
};

export const Alert = ({ children, type = AlertType.success }: Props) => (
  <div className={`alert alert-${type}`} role="alert">
    {children}
  </div>
);
