"use client";
import React, { useEffect, useState } from "react";
import { CgSpinner, cgSpinner } from "react-icons/cg";
import { auth } from "../firebase";
import OtpInput from "react-otp-input";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import password from "../Images/password.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import Setprofile from "../setprofile/page";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import india from '../Images/india.png'


function Login() {
  const searchParams = useSearchParams();
  const [ph, setPh] = useState("");
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState("");
  const [uid, setUid] = useState("");
  const [data, setData] = useState("");
  const [curUser, setCurUser] = useState("");
  let [btnnum, setBtnNum] = useState(59);
  const router = useRouter();

  const reference = searchParams.get("reference");

  useEffect(() => {
    const auth = getAuth();

    let curUser = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/");
      }
    });

    return () => curUser();
  }, []);

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignUp();
          },
          "expired-callback": () => {},
        }
      );
    }
  }

  const onVerifyPhone = () => {
    if (ph === "") {
      toast.error("Please Enter Phone Number!", { autoClose: 1000 });
    } else {
      setLoading(true);
      onCaptchaVerify();

      const appVerifier = window.recaptchaVerifier;
      const formatPh = "+91" + ph;
      signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setLoading(false);
          setShowOTP(true);
          toast.success("OTP Sent Successfully!", { autoClose: 2000 });
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const onOTPVerify = () => {
    if (otp === "") {
      toast.error("Enter OTP");
    } else {
      setLoading(true);
      if (typeof window !== "undefined") {
        // Access window or any browser-specific APIs here

        window.confirmationResult.confirm(otp).then(async (res) => {
          // console.log(res);
          setUser(res.user);
          setLoading(false);

          //gettting the uid of current user
          const auth = getAuth();
          const uid = auth.currentUser.uid;
          setUid(uid);

          //Code to Check if user Exist or New
          const userData = auth.currentUser;
          if (
            userData.metadata.creationTime === userData.metadata.lastSignInTime
          ) {
            // console.log("user for the first time");
            setData(false);
          } else {
            // console.log("user already present");
            setData(true);
          }
        });
      }
    }
  };

  useEffect(() => {
    const c = setInterval(() => {
      if (btnnum >= 0 && showOTP) {
        if (btnnum === 0) {
          clearInterval(c);
          return;
        } else {
          setBtnNum(btnnum - 1);
        }
      }
    }, 1000);

    return () => clearInterval(c);
  }, [showOTP === true, btnnum]);

  return (
    <div className="w-[100%]">
      <ToastContainer />

      <div className="lg:max-w-[400px] grid grid-cols-1 justify-items-center max-w-[970px] min-w-[600px] lg:min-w-[400px] py-[100px] mx-auto lg:h-[90vh] p-10">
        <div id="recaptcha-container"></div>

        <div>
          {user ? (
            data ? (
              reference ? (
                router.push("/checkout/addresses")
              ) : (
                router.push("/")
              )
            ) : (
              <Setprofile />
            )
          ) : showOTP ? (
            <div>
              <div className="grid grid-cols-1 justify-items-center">
                <Image
                  className="w-[100px]"
                  src={password}
                  alt="image"
                  width={200}
                  height={200}
                />
                <h2 className="mt-3">Enter One Time Password Sent to</h2>
                <h1>{"+91 " + ph}</h1>
              </div>

              <div className="grid grid-cols-1 justify-items-center mt-5 caret-black">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  inputType="number"
                  inputStyle={{borderWidth:1, borderRadius:4, width:30, height:30, borderColor:"black", borderStyle:"solid" }} skipDefaultStyles={true}
                  shouldAutoFocus={true}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />

                <h2>
                  Didn't receive the OTP?{" "}
                  <span className="text-red-400 font-semibold pt-4">
                    {btnnum === 0 ? (
                      <button
                        className="cursor-pointer lg:text-base text-xl"
                        onClick={onVerifyPhone}
                      >
                        Resend
                      </button>
                    ) : (
                      btnnum + "s"
                    )}
                  </span>
                </h2>
              </div>

              <button
                onClick={onOTPVerify}
                className="bg-red-400 w-full flex gap-2 items-center justify-center mt-5 py-2.5 text-white rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify OTP</span>
              </button>
            </div>
          ) : (
            <div>
              <div>
                <h1 className="text-gray-300 text-xl lg:text-base font-bold">
                  Get in and get shopping! <br /> Let's make those wishlists a
                  reality.
                </h1>
                <h1 className="font-semibold text-xl text-red-400 mb-5">
                  Login/Signup to Continue
                </h1>
              </div>

              <div className="relative w-full">
                <div class="relative text-gray-600 focus-within:text-gray-400">
                  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                   
                  <Image src={india} width={100} height={100} className="w-[30px]"/>
                  <h4 className="text-black text-xl lg:text-base">+91</h4>

                  </span>
                  <input
                    type="tel"
                    name="q" maxLength={10} max={10}
                    class="border-[1px] hover:border-2 border-solid border-gray-600 text-md text-black p-4 lg:p-3 w-full text-xl lg:text-base rounded-md pl-[4.8rem] lg:pl-[4.5rem] focus:outline-none  "
                    placeholder="Enter Phone Number"
                    autocomplete="off" onChange={(e) =>{
                      const num = e.target.value
                      const numericValue = num.replace(/\D/g, '')
                       setPh(numericValue)
                       }} value={ph}
                  />
                </div>
                {/* <PhoneInput
                  className="w-full caret-black"
                  inputStyle={{
                    height: "70px",
                    width: "380px",
                    fontSize: "16px",
                  }}
                  country={"in"}
                  
                  onlyCountries={["in"]}
                  placeholder="Enter Phone Number"
                  
                /> */}
              </div>

              <div>
                <button
                  className="bg-red-400 flex items-center justify-center gap-4 text-white rounded mt-5 lg:w-full px-[10rem] py-3 text-xl lg:text-base"
                  onClick={() => onVerifyPhone()}
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Continue</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
