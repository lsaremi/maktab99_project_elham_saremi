import { useState } from "react";
import payment_gateway from "./assets/images/payment-gateway.jpg";

function App() {
  const [paymentResult, setPaymentResult] = useState(null);

  const handlePayment = () => {
    setPaymentResult("success");
  };

  const handleCancel = () => {
    setPaymentResult("fail");
  };

  const redirectToResultPage = () => {
    if (paymentResult === "success") {
      window.location.assign("http://localhost:3000/resultpayment/success");
    } else if (paymentResult === "fail") {
      window.location.assign("http://localhost:3000/resultpayment/fail");
    }
  };

  return (
    <div className="container">
      <img
        src={payment_gateway}
        alt="payment_gateway"
        className="payment_gateway"
      />
      <div className="btnContainer">
        <button className="btn fail" onClick={handleCancel}>
          انصراف
        </button>
        <button className="btn success" onClick={handlePayment}>
          پرداخت
        </button>
        {paymentResult && redirectToResultPage()}
      </div>
    </div>
  );
}

export default App;
