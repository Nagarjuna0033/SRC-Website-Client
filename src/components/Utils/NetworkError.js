import React from "react";
import "../../styles/NetworkError.css";

export default function NetworkError() {
  return (
    <>
      <div class="flex-center position-r full-height">
        {/* <div class="code">404 </div> */}

        <div class="message" style={{ padding: "10px" }}>
          NETWORK ERROR
        </div>
      </div>
    </>
  );
}
