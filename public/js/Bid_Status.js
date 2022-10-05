"use script";

document
  .querySelector(".bid-info .chng-bid")
  .addEventListener("click", function () {
    document.querySelector(".bid-container2").style.display = "flex";
  });

document
  .querySelector(".bid-input2 button")
  .addEventListener("click", function () {
    let input = Number(document.querySelector(".bid-input2 input").value);
    if (!input) {
      alert("Enter a valid Bid");
      bid_value = document.querySelector(".bid-input2 input").value;
      document.querySelector(".bid-input2 input").value = null;
    } else {
      alert("Bid Successfully Changed");
      bid_value = Number(document.querySelector(".bid-input2 input").value);
      document.querySelector(".bid-input2 input").value = null;
      const element = document.getElementById("test");
      bid_value = "$" + bid_value;
      element.textContent = bid_value;
      document.querySelector(".bid-container2").style.display = "none";
    }
  });
