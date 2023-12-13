"use client";

import React from "react";
import { redirect } from "next/navigation";

function Product() {
  redirect("/");

  return (
    <div>
      <h1>This is product page.</h1>
    </div>
  );
}

export default Product;
