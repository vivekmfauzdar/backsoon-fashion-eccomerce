import React from "react";
import Link from "next/link";

function Topcategories() {
  const data = [
    {
      imageurl:
        "https://img.freepik.com/free-photo/handsome-confident-hipster-modelsexy-unshaven-man-dressed-summer-stylish-green-hoodie-jeans-clothes-fashion-male-with-curly-hairstyle-posing-studio-isolated-blue_158538-26584.jpg?w=900&t=st=1697534815~exp=1697535415~hmac=bd5326a0c6134a4b0158fb5af5460b3093c92fdce48c90e403fc376b2ea8e45e",
      head: "hoodie",
      link: "/hoodies",
    },

    {
      imageurl:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      head: "Shoes",
      link: "/shoes",
    },

    {
      imageurl:
        "https://img.freepik.com/free-photo/portrait-handsome-confident-stylish-hipster-lambersexual-model_158538-18007.jpg?w=740&t=st=1697541455~exp=1697542055~hmac=eafe151835c41fab7bca6507b85fa2ee2a190363e6de03ea2f3f9c32e80f2bab",
      head: "Tshirt",
      link: "/tshirts",
    },

    {
      imageurl:
        "https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man-model-dressed-red-checkered-shirt-fashion-man-posing_158538-4909.jpg?w=740&t=st=1697541586~exp=1697542186~hmac=ca4cfcc6bf40f065ef0bafe93fabd0ca066e260e428f5c583ea78d14b5131685",
      head: "Shirt",
      link: "/shirts",
    },

    {
      imageurl:
        "https://img.freepik.com/free-photo/image-handsome-happy-guy-christmas-sweater-smiling-looking-camera-celebrating-xmas-holidays-standing-red-background_1258-63133.jpg?w=900&t=st=1697541538~exp=1697542138~hmac=50e64ab292e3837a1d958f9a8cbc09e13c42fb05f5e037ede09a28f65cd2fd2c",
      head: "Sweater",
      link: "/sweaters",
    },

    {
      imageurl:
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
      head: "Jeans",
      link: "/jeans",
    },
  ];

  return (
    <div>
      <div className="pt-10">
        <h1 className="text-2xl font-semibold mb-5 pl-2">Top Categories</h1>
        <div className="grid md:grid-cols-3  grid-cols-2 justify-items-center gap-y-8">
          {data.map((elm, index) => {
            return (
              <Link href={`${elm.link}`} key={index}>
                <div
                  className="bg-cover rounded flex items-end cursor-pointer text-center bg-center lg:w-[330px] lg:h-[330px] w-[280px] h-[280px] overflow-hidden transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundImage: `url(${elm.imageurl})` }}
                >
                  <div className="text-white text-center">
                    <h1 className="text-2xl font-bold drop-shadow-lg">
                      {elm.head}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Topcategories;
