//CJS
//Hello Player.
let player = {
    playerName: "Hello World",
    moneyAmount: 0,
    moneyType: " Kr.",
    loanTaken: false,
    loanAmount: 0,
    workAmount: 0,
    workPay: 100,
}

//Computer stuff
let theComputersAsValue = []
let theComputerValues = {
    computerId: 1,
    computerName: "Classic Notebook",
    computerDesc: "A little old, but turns on.",
    computerPrice: 200,
    computerImg: "1.jpg",
    computerSpecs: [
        "Has a screen",
        "Keyboard works, mostly",
        "32MB Ram (Not upgradable)",
        "6GB Hard Disk",
        "Comes with Floppy Disk Reader (Free) - Requires cable",
        "Good exercise to carry",
    ],
}

//Shal we get some of dem DOMs?
let nameOnBank = document.getElementById("nameOnBank")
let balance = document.getElementById("bankBalance")
let pay = document.getElementById("workPay")
let laptopSelectBox = document.getElementById("laptopSelectBox")
let laptopFeatures = document.getElementById("laptopFeatures")
let laptopPrice = document.getElementById("laptopPrice")
let laptopName = document.getElementById("laptopName")
let laptopDesc = document.getElementById("laptopDesc")
let laptopImg = document.getElementById("laptopImg") 
let btnRepayLoan = document.getElementById("btnRepayLoan")
let loanAmountArea = document.getElementById("loanAmountArea")
let theLoan = document.getElementById("theLoan")
let btnGetLoan = document.getElementById("btnGetLoan")

//Oh no, the api is here.
async function getAsync(){
    try{
        const response = await fetch("https://screeching-lopsided-canidae.glitch.me/computers")
        const json = await response.json()
        return json
    }catch(error){
        console.log(error)
    }
}

async function waitAndExecute(){
    const computerJson = await getAsync()

    for (let i of computerJson){
        let newOption = document.createElement("option")
        newOption.value = i.id - 1
        newOption.innerText = i.title
        laptopSelectBox.appendChild(newOption)
        theComputersAsValue.push(i)
    }
}

//Here we shal make some functions.
function renderPage(){
    if (player.loanTaken === false){
        btnGetLoan.hidden = false
        btnRepayLoan.hidden = true
        loanAmountArea.hidden = true
    }else{
        btnGetLoan.hidden = true
        btnRepayLoan.hidden = false
        loanAmountArea.hidden = false
        theLoan.innerText = player.loanAmount + player.moneyType
    }

    balance.innerText = player.moneyAmount + player.moneyType
    pay.innerText = player.workAmount + player.moneyType
    nameOnBank.innerText = player.playerName + "'s Bank"
}

function loanCheck(){
    if (player.loanAmount === 0){
        player.loanTaken = false
    }
    renderPage()
}

function renderComputerSection(){
    let items = laptopFeatures.getElementsByTagName("li")
    for (let i = 0; i <= 5; ++i){
        items[i].innerText = theComputerValues.computerSpecs[i]
    }
    laptopPrice.innerText = theComputerValues.computerPrice + " NOK"
    laptopName.innerText = theComputerValues.computerName
    laptopDesc.innerText = theComputerValues.computerDesc
    laptopImg.src="https://cdn.glitch.global/638b3c0b-25db-4de8-bb86-38ead3289b23/" + theComputerValues.computerImg
}

//Functions to send to the other thingy.
function theBank(){
    const numSafety = player.workAmount
    if (player.loanTaken === true){
        const portion = numSafety / 10
        let money = numSafety - portion
        if (player.loanAmount >= portion){
            player.loanAmount -= portion
            alert(`${money} ${player.moneyType} Has been added to your account. ${portion} ${player.moneyType} Has been used to repay loan.`)
        }else{
            const remainder = portion - player.loanAmount
            player.loanAmount = 0
            money += remainder
            alert(`${money} ${player.moneyType} Has been added to your account, and your loan has been repaid.`)
        }
        player.moneyAmount += money
    }else{
        player.moneyAmount += numSafety
        alert(`${numSafety} ${player.moneyType} Has been added to your account.`)
    }
    player.workAmount = 0
    loanCheck()
}

function theWork(){
    player.workAmount += player.workPay
    renderPage()
}

function repayLoan(){
    let amount = player.workAmount
    let check = confirm(`Do you wish to spend ${amount} ${player.moneyType} to repay your loan?`)
    if (check){
        const numSafety = Number(amount)
        if (amount === 0){return alert("You can't repay your loan with no money in the work balance.")}
        if (player.loanAmount >= numSafety){
            player.loanAmount -= numSafety
            player.workAmount = 0
            alert(`${numSafety} ${player.moneyType} Has been used to repay the loan.`)
            loanCheck()
        }else{
            const remainder = numSafety - player.loanAmount
            player.loanAmount = 0
            player.moneyAmount += remainder
            player.workAmount = 0
            alert(`Your loan has been repaid. The remainding ${remainder} ${player.moneyType} has been added to your account.`)
            loanCheck()
        }
    }else{
        alert("Repayment canceled.")
    }
}

function buyComputer(){
    if (player.moneyAmount >= theComputerValues.computerPrice){
        const check = confirm(`Do you wish to buy ${theComputerValues.computerName} for ${theComputerValues.computerPrice} NOK?`)
        if (check){
            player.moneyAmount -= theComputerValues.computerPrice
            alert(`Sucessfully bought ${theComputerValues.computerName} for ${theComputerValues.computerPrice} Kr.`)
            renderPage()
        }else{
            alert("Transaction canceled.")
        }
    }else{
        alert("You do not have enough money to buy this laptop.")
    }
}

function getLoan(){
    if (player.loanTaken === false){
        const howMuch = Number(prompt(`How much do you want to loan? Input a number! (Max amount ${player.moneyAmount * 2})`))
        console.log(howMuch < player.moneyAmount * 2)
        if (!howMuch < player.moneyAmount * 2 && howMuch != 0){
            player.loanTaken = true
            player.moneyAmount += howMuch
            player.loanAmount = howMuch
            alert(`Loan of ${howMuch} Kr taken.`)
            renderPage()
        }else{
            alert("You can not take a loan this high/low! Loan attempt canceled.")
        }
    }else{
        //if this somehow is triggered.. I must have done something wrong..
        alert("You already have a loan taken.")
    }
}

function changeLaptop(id){
    theComputerValues.computerName = theComputersAsValue[id].title
    theComputerValues.computerDesc = theComputersAsValue[id].description
    theComputerValues.computerPrice = theComputersAsValue[id].price
    theComputerValues.computerImg = theComputersAsValue[id].image
    theComputerValues.computerId = theComputersAsValue[id].id
    theComputerValues.computerSpecs = theComputersAsValue[id].specs
    renderComputerSection()
}

function getName(){
    const getName = prompt("Please input your name.")
    player.playerName = getName
    renderPage()
}

renderComputerSection()
renderPage()
getName()
waitAndExecute()

//Welcome to the group system.
const system = {
    player,
    theBank,
    theWork,
    repayLoan,
    buyComputer,
    getLoan,
    changeLaptop,
}

export default system