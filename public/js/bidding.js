"use strict";

const modal1 = document.querySelector(".modal1");
const modal2 = document.querySelector(".modal2");
const overlay = document.querySelector(".overlay");
const BtnCloseModal1 = document.querySelector(".close-modal1");
const BtnCloseModal2 = document.querySelector(".close-modal2");

function MyFunction() {
  document.querySelector(".tournament").disabled = true;
}
MyFunction();

var bid_value;
var flag = 0;
var k;
var slot = -1;
var collection = document.getElementsByClassName("time");
var buttons = document.getElementsByTagName("button");
var count = new Array(collection.length).fill(0);

const openModalValid = function () {
  modal1.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const openModalInvalid = function () {
  modal2.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const close_Modal2 = function () {
  modal2.classList.add("hidden");
  overlay.classList.add("hidden");
};

const close_Modal1 = function () {
  modal1.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < collection.length; i++) {
  collection[i].addEventListener("click", function () {
    count[i]++;
    console.log(count[0]);
    if (count[i] % 2 != 0) {
      if (flag == 1) {
        buttons[k].style.backgroundColor = "#d9d9d9";
        buttons[k].style.color = "#424242";
        count[k]--;
        document.querySelector(".bid-container").style.display = "none";
        document.getElementById("last_day").style.marginBottom = "7rem";
        flag = 0;
      }
      if (flag == 0) {
        buttons[i].style.backgroundColor = "#e87d00";
        buttons[i].style.color = " white";
        buttons[i].style.textShadow = "0px 0px 7px rgba(255, 255, 255, 0.41)";
        slot = buttons[i].textContent;
        document.querySelector(".bid-container").style.display = "flex";
        document.getElementById("last_day").style.marginBottom = "0px";
        flag = 1;
        k = i;
      }
    }
    if (count[i] % 2 == 0) {
      buttons[i].style.backgroundColor = "#d9d9d9";
      buttons[i].style.color = "#424242";
      document.querySelector(".bid-container").style.display = "none";
      document.getElementById("last_day").style.marginBottom = "7rem";
      flag = 0;
    }
  });
}

document
  .querySelector(".bid-input button")
  .addEventListener("click", function () {
    let input = Number(document.querySelector(".bid-input input").value);
    if (!input) {
      openModalInvalid();
      bid_value = document.querySelector(".bid-input input").value;
      document.querySelector(".bid-input input").value = null;
      BtnCloseModal2.addEventListener("click", close_Modal2);
    } else if (slot != -1) {
      openModalValid();
      bid_value = document.querySelector(".bid-input input").value;
      document.querySelector(".bid-input input").value = null;
      BtnCloseModal1.addEventListener("click", close_Modal1);
    }
  });
