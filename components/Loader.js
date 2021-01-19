import ClockLoader from "react-spinners/ClockLoader";
import { css } from "@emotion/core";
import React from "react";

export default function Loader() {
      const override = css`
        display: block;
        margin: 0 auto;
        border-color: blue;
      `;
    return (
      <div>
        <ClockLoader
          color={"orange"}
          css={override}
          size={150}
        />
      </div>
    );
}