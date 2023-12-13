"use client";
import { useState, useEffect } from "react";
import { dbfs } from "@/app/firebase";
import { getAuth } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Payments() {
  const router = useRouter();
  const [modeofPay, setModeOfPay] = useState("");
  const [products, setProducts] = useState([]);
  const [curUserId, setCurUserUid] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [price, setPrice] = useState([]);
 

  // getting the current user
  useEffect(() => {
    const auth = getAuth();

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurUserUid(user.uid);
        console.log(user.uid);
      } else {
        setCurUserUid(null);
      }
    });
  }, []);

  useEffect(() => {
    const cartData = localStorage.getItem("cartData");
    if (cartData) {
      setProducts(JSON.parse(cartData));
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const selectedAddress = localStorage.getItem("Selected Address");

    if (selectedAddress) {
      setUserInfo(JSON.parse(selectedAddress));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((curData) =>
        setPrice((p) => [...p, curData.productprice])
      );
    }
  }, [products]);

  const priceSum = () => {
    const sum = price.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return sum + 40;
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // confirm Order Button CODE
  const confirmOrder = async () => {
    if (modeofPay === "") {
      toast.error("Please Select Payment Method");
    } else if (modeofPay === "Cash On Delivery") {
      products.map((curProduct) => {
        const fullProductDetails = {
          ...curProduct,
          totalprice: curProduct.productprice + 40,
          time: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),

          orderStatus: "Pending",
          paymentMode: modeofPay,
          userInfo: userInfo,
          paymentId: "No Payment Id",
          UID: curUserId,
        };

        dbfs
          .collection("Orders")
          .doc(curUserId)
          .collection("products")
          .doc(curProduct.id)
          .set(fullProductDetails)
          .then(() => {
            router.push("/orders/successful");
            localStorage.removeItem("cartData");
            localStorage.removeItem("newCartData");
          });
      });
    } else if (modeofPay === "Pay Through Online") {
      const res = await initializeRazorpay();
      if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
      }

      var options = {
        key: "rzp_test_ASSIWj7q2g2K8t", // Enter the Key ID generated from the Dashboard
        name: "Backsoon Pvt. Ltd.",
        amount: parseInt(priceSum() * 100),
        currency: "INR",
        order_receipt: "order_rcptid_" + "name",
        description: "Thankyou for your test donation",
        image:
          "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbacksoon_logo1.95625756.png&w=3840&q=75",
        handler: function (response) {
          toast.success("Payment Successful");

          const paymentId = response.razorpay_payment_id;

          products.map((curProduct) => {
            const fullProductDetails = {
              ...curProduct,
              totalprice: curProduct.productprice + 40,
              time: new Date().toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }),
              date: new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              orderStatus: "Pending",
              paymentMode: modeofPay,
              userInfo: userInfo,
              paymentId: paymentId,
              UID: curUserId,
            };

            dbfs
              .collection("Orders")
              .doc(curUserId)
              .collection("products")
              .doc(curProduct.id)
              .set(fullProductDetails)
              .then(() => {
                router.push("/orders/successful");

                localStorage.removeItem("cartData");
                localStorage.removeItem("newCartData");
              });
          });
        },
      };

      var pay = new window.Razorpay(options);
      pay.open();
    }
  };

  return (
    <div className="max-w-[700px] min-w-[600px] p-5 mx-auto py-[50px]">
      <Toaster toastOptions={{ duration: 2000 }} />

      <h1 className="font-semibold text-xl py-5">Choose Payment Option</h1>
      <div className="">
        <div className="flex gap-2 pb-5">
          <input
            type="radio"
            name="payment"
            className="w-6"
            value="Pay Through Online"
            onChange={(e) => setModeOfPay(e.target.value)}
          />
          <h2>Pay through UPI/Cards/Netbanking</h2>
        </div>

        <div className="flex gap-2 pb-5">
          <input
            type="radio"
            name="payment"
            className="w-6"
            onChange={(e) => setModeOfPay(e.target.value)}
            value="Cash On Delivery"
          />
          <h2>Cash On Delivery</h2>
        </div>

        <button
          className="bg-pink-400 rounded text-white px-4 py-2"
          onClick={() => confirmOrder()}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Payments;
