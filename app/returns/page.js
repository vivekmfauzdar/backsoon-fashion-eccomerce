import React from "react";

function page() {
  return (
    <div>
      <div>
        <div className="w-[100%] pt-20 caret-transparent mb-24">
          <div className="max-w-[770px] min-w-[400px] p-5 mx-auto text-black select-none">
            <div>
              <h1 className="text-2xl font-bold">Returns Policy</h1>
            </div>
            <div className="text-justify mt-10">
              At Backsoon Fashion, we want you to be completely satisfied with
              your purchase. If you're not entirely pleased with your order,
              we're here to help with our hassle-free return policy.
              <br />
              <br />
              <span className="font-semibold">Returns</span>
              <br />
              <br />
              We accept returns within 30 days from the date of purchase. To be
              eligible for a return, the item must be unworn, unwashed, and in
              its original condition with tags attached. It must also be in the
              original packaging.
              <br />
              <br />
              <span className="font-semibold">Initiating a Return</span>
              <br />
              <br />
              To initiate a return, please follow these steps:
              <ul>
                <li>
                  Contact our customer support team at{" "}
                  <span className="font-semibold">
                    returns@backsoonfashion.com{" "}
                  </span>{" "}
                  to request a return authorization.
                </li>
                <li>
                  Our team will provide you with further instructions, including
                  the return address.
                </li>
                <li>
                  Pack the item securely, including all original packaging and
                  tags, and ship it to the provided address.
                </li>
              </ul>
              <br />
              <br />
              <span className="font-semibold">Refunds</span>
              <br />
              <br />
              Once we receive your returned item, our team will inspect it to
              ensure it meets the return criteria. Upon approval, we will
              process the refund to your original payment method. Please note
              that shipping fees are non-refundable, and the customer is
              responsible for return shipping costs.
              <br />
              <br />
              <span className="font-semibold">Exchanges</span>
              <br />
              <br />
              If you wish to exchange an item for a different size or color,
              please contact our customer support team. We'll guide you through
              the exchange process and assist in arranging the replacement item.
              <br />
              <br />
              <span className="font-semibold">Damaged or Incorrect Items</span>
              <br />
              <br />
              In the rare event that you receive a damaged or incorrect item,
              please contact us immediately. We will work swiftly to resolve the
              issue and ensure your satisfaction.
              <br />
              <br />
              <span className="font-semibold">Contact Us</span>
              <br />
              <br />
              If you have any questions or need further assistance regarding
              returns or exchanges, please don't hesitate to contact our
              customer support team at{" "}
              <span className="font-semibold">
                returns@backsoonfashion.com{" "}
              </span>
              or through our Contact Us page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
