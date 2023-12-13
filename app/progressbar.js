"use client";

import React from "react";

function Progressbar() {
  return (
    <div>
      <div class="shadow w-full bg-grey-light mt-2">
        <div
          class="bg-blue-400 text-xs py-[3px] leading-none text-center text-white"
          style={{ width: "55%" }}
        ></div>
      </div>
    </div>
  );
}

export default Progressbar;
