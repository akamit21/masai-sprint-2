// items array
var items = [
  {
    code: "#45",
    name: "Dosa",
    rate: 50
  },
  {
    code: "#46",
    name: "Idli",
    rate: 60
  },
  {
    code: "#49",
    name: "Chicken",
    rate: 100
  }
];

// row increment
var rowIndex = 0;

// variable declaration
var discount = getElement("#discount");
var gst = getElement("#gst");
var serviceTax = getElement("#serviceTax");

// added event listener to input
discount.addEventListener("change", totalAmount);
gst.addEventListener("change", totalAmount);
serviceTax.addEventListener("change", totalAmount);

// function add item
function addItem() {
  var item = getElement("#addItem");
  var tableBody = getElement("#tableBody");
  items.forEach(function(ele) {
    if (ele.code == item.value) {
      var itemRow = addTableRow(ele);
      tableBody.appendChild(itemRow);
    }
  });
  totalAmount();
}

// function create
function addTableRow(item) {
  rowIndex++;
  var emptyRow = document.createElement("tr");
  emptyRow.setAttribute("id", rowIndex);
  emptyRow.innerHTML =
    "<td><span onclick='removeItem()'>" +
    item.code +
    "</span></td>" +
    "<td>" +
    item.name +
    "</td>" +
    "<td><input type='text' id='rate" +
    rowIndex +
    "' value='" +
    item.rate +
    "'readonly /></td>" +
    "<td><input type='number' id='qty" +
    rowIndex +
    "' value='1' onchange='calculatePrice()' /></td>" +
    "<td><input type='text' class='amt' id='amt" +
    rowIndex +
    "' value='" +
    item.rate +
    "' readonly /></td>";
  return emptyRow;
}

// fuction to calculate item price
function calculatePrice() {
  var parentRow = event.target.parentNode.parentNode;
  var parentRowId = parentRow.getAttribute("id");
  var itemRate = getElement("#rate" + parentRowId).value;
  var itemQty = event.target.value;
  var itemPrice = itemRate * itemQty;
  getElement("#amt" + parentRowId).value = itemPrice;
  totalAmount();
}

// fuction to remove a item
function removeItem() {
  var parentRow = event.target.parentNode.parentNode;
  parentRow.remove();
  totalAmount();
}

// function to calculate grand total
function totalAmount() {
  var subTotal = 0;
  var grandTotal = 0;
  var amt = getAllElement(".amt");
  amt.forEach(function(ele) {
    subTotal += parseInt(ele.value);
  });

  // getting discount applied
  var discount = getElement("#discount").value;
  if (parseInt(discount) < parseInt(subTotal)) {
    grandTotal = subTotal - discount;
  }

  // calculate gst applied
  var gst = getElement("#gst").value;
  if (gst > 0) {
    grandTotal = ((100 + parseInt(gst)) * parseInt(grandTotal)) / 100;
    grandTotal = Math.round(grandTotal);
  }

  // calculate service tax
  var serviceTax = getElement("#serviceTax").value;
  if (serviceTax > 0) {
    grandTotal = ((100 + parseInt(serviceTax)) * parseInt(grandTotal)) / 100;
    grandTotal = Math.round(grandTotal);
  }

  getElement("#subtotal").value = parseInt(subTotal);
  getElement("#total").value = parseInt(grandTotal);
}

// querySelector
function getElement(el) {
  return document.querySelector(el);
}

// getSelectorAll
function getAllElement(el) {
  return document.querySelectorAll(el);
}
