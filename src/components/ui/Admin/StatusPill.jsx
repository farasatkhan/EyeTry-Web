import React, { useState, useEffect } from "react";

/*
Banned - danger
Unverified - warning
Active - primary
*/
const StatusPill = ({ text, type }) => {
  return type === "primary" ? (
    <div
      className={`bg-primary-100 w-20 h-6 flex justify-center items-center rounded-full`}
    >
      <p className={`text-primary-900 font-bold uppercase text-xs`}>{text}</p>
    </div>
  ) : type === "danger" ? (
    <div
      className={`bg-danger-100 w-20 h-6 flex justify-center items-center rounded-full`}
    >
      <p className={`text-danger-900 font-bold uppercase text-xs`}>{text}</p>
    </div>
  ) : (
    type === "warning" && (
      <div
        className={`bg-warning-100 w-20 h-6 flex justify-center items-center rounded-full`}
      >
        <p className={`text-warning-900 font-bold uppercase text-xs`}>{text}</p>
      </div>
    )
  );
};

export default StatusPill;
