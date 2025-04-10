//CJS
import system from "./systemMod.js";

//DOMs

const btnGetLoan = document.getElementById("btnGetLoan")
const btnRepayLoan = document.getElementById("btnRepayLoan")
const btnBankPay = document.getElementById("btnBankPay")
const btnWork = document.getElementById("btnWork")
const laptopSelectBox = document.getElementById("laptopSelectBox")
const btnBuyLaptop = document.getElementById("btnBuyLaptop")

//Event Listeners
btnGetLoan.addEventListener("click", system.getLoan)
btnRepayLoan.addEventListener("click", system.repayLoan)
btnBankPay.addEventListener("click", system.theBank)
btnWork.addEventListener("click", system.theWork)
btnBuyLaptop.addEventListener("click", system.buyComputer)
laptopSelectBox.addEventListener("click", selectBoxHelper)


//Event Handlers
function selectBoxHelper(){
    system.changeLaptop(laptopSelectBox.value)
}

//Other Functions

//The Totally Not Important Stuff