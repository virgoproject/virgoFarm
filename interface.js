$('input[type="range"]').rangeslider({
    polyfill : false
});

const notyf = new Notyf({
    duration: 2500,
    position: {
        x: 'center',
        y: 'top'
    }
})

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

// Web3modal instance
let web3Modal;

// Chosen wallet provider given by the dialog window
let provider;
let web3;

let account;

let tokenAddress = "0xbEE5E147e6e40433ff0310f5aE1a66278bc8D678";
// The minimum ABI to get ERC20 Token balance
let tokenABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let farmAddress = "0x707944C2966C40D85d07Ac6b1DBd5c84671b0C4e";

let farmABI = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "addFunds",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "maxIterations",
                "type": "uint256"
            }
        ],
        "name": "distribute",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getDistributed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getLastDistribution",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getLock",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "getLocksCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getToDistribute",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getToDistributeThisRound",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTotalLocked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "initDistribution",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lockDuration",
                "type": "uint256"
            }
        ],
        "name": "lock",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lockDuration",
                "type": "uint256"
            }
        ],
        "name": "lockFor",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "retrieveEarnings",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "unlock",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let contract;

let farmContract;

let balance = 0;
let allowance = 0;

async function getLocks(address){
    let locksCount = await farmContract.methods.getLocksCount(address).call()
    let locks = []

    for(let i = 0; i < locksCount; i++)
        locks.push(await farmContract.methods.getLock(address, i).call())

    return locks
}

async function getBalance(address){
    return await contract.methods.balanceOf(address).call();
}

async function getAllowance(owner, spender){
    return await contract.methods.allowance(owner, spender).call();
}

async function approve(spender, amount){
    return await contract.methods.approve(spender, amount).send();
}

async function addFunds(amount){
    return await farmContract.methods.addFunds(amount).send();
}

async function retrieveEarnings(index){
    return await farmContract.methods.retrieveEarnings(index).send();
}

function init() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    56: 'https://bsc-dataseed.binance.org/'
                },
                network: 'binance',
                chainId: 56
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });
}

async function onConnect(){
    $("#connectBtn").attr("disabled", true);
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);

        web3.eth.getAccounts().then(function(result){
            contract = new web3.eth.Contract(tokenABI, tokenAddress, { from: result[0]});
            farmContract = new web3.eth.Contract(farmABI, farmAddress, { from: result[0]});

            $("#connectBox").hide()
            $("#stacksBox").show()
            addressChanged(result[0]);
            updateStats();

            setInterval(function(){
                updateStats();
            }, 5000);

            let checkConnectionTimer = setInterval(function(){
                if (web3.currentProvider.connected === false){
                    onDisconnect();
                    clearInterval(checkConnectionTimer);
                }
            }, 100);

            // Subscribe to chainId change
            provider.on("chainChanged", () => {
                onDisconnect();
            });

            // Subscribe to networkId change
            provider.on("networkChanged", () => {
                onDisconnect();
            });

            provider.on("accountsChanged", () => {
                onDisconnect();
            });
        });

    } catch(e) {}
    $("#connectBtn").attr("disabled", false);
}

function addressChanged(address) {
    account = address;
    $("#accountText").html(account);
    $("#disconnectBtn").show();

    var icon = blockies.create({ // All options are optional
        seed: account, // seed used to generate icon data, default: random
        size: 15, // width/height of the icon in blocks, default: 8
        scale: 3, // width/height of each block in pixels, default: 4
    });

    document.getElementById('identicon').appendChild(icon);
}

$("#disconnectBtn").click(function(){
    onDisconnect();
});

async function onDisconnect(){
    if (provider.close)
        await provider.close();

    await web3Modal.clearCachedProvider();
    location.reload();
}

function updateStats() {
    checkAllowance();

    getBalance(account).then(function (result) {
        balance = result;
        $("#balance").html(formatAmount(result));
    });

    getLocks(account).then(function(locks){
        $("#stacksAmount").html(locks.length)

        while(locks.length < $("#stacks").children().length-1){
            $("#stacks").children().eq($("#stacks").children().length-1).remove()
        }

        while(locks.length > $("#stacks").children().length-1){
            let newStack = $("#baseStack").clone()
            $("#stacks").append(newStack)

            newStack.find(".btnClaim").click(function(){
                disableBtn(newStack.find(".btnClaim"))
                retrieveEarnings(newStack.index()-1).then(function(){
                    updateStats()
                    enableBtn(newStack.find(".btnClaim"))
                    newStack.find(".btnClaim").attr("disabled", true)
                    notyf.success("Successfully claimed reward!")
                }).catch(function (res){
                    enableBtn(newStack.find(".btnClaim"))
                })
            })

            newStack.find(".btnUnlock").click(function(){
                disableBtn(newStack.find(".btnUnlock"))
                farmContract.methods.unlock(newStack.index()-1).send()
                    .on("receipt", function(result){
                        updateStats()
                        newStack.remove()
                        notyf.success("Successfully unstacked!")
                }).catch(function (res){
                    enableBtn(newStack.find(".btnUnlock"))
                })
            })

            newStack.show()
        }

        if(locks.length == 0)
            $("#noStackMsg").show()
        else
            $("#noStackMsg").hide()

        for(let i = 0; i < locks.length; i++){
            let lock = locks[i]
            let lockDiv = $("#stacks").children().eq(i+1)

            lockDiv.find(".stackValue").html(formatAmount(lock[0]))
            lockDiv.find(".stackYield").html(0.25*lock[3]+5.2)
            lockDiv.find(".stackReward").html(formatAmount(lock[4]))
            lockDiv.find(".stackTotalReward").html(formatAmount(lock[5]))

            if(lock[2] <= Date.now()/1000){
                if(!isDisabledBtn(lockDiv.find(".btnUnlock"))){
                    lockDiv.find(".btnUnlock").attr("disabled", false)
                    lockDiv.find(".btnUnlock val").html("UNLOCK")
                }
            }else if(!isDisabledBtn(lockDiv.find(".btnUnlock"))){
                let remainingDays = Math.round((lock[2]-Date.now()/1000)/86400)
                lockDiv.find(".btnUnlock value").html(remainingDays + " DAYS")
            }

            if(!isDisabledBtn(lockDiv.find(".btnClaim")))
                lockDiv.find(".btnClaim").attr("disabled", lock[4] == 0)
        }
    })

}

$("#stackAmountMax").click(function(){
    $("#stackAmountInput").val(formatAmount(balance));
    checkStackAmount();
});

$("#addStackBtn").click(function(){
    $("#addStack").show()
    $("#stacksBox").hide()
})

$("#newStackBack").click(function(){
    $("#addStack").hide()
    $("#stacksBox").show()
})

$("#stackAllow").click(function(){
    disableBtn($("#stackAllow"));
    approve(farmAddress, 6003200000000000).then(function(result){
        let timer = setInterval(function(){
            if (allowance > 3003200000000000){
                clearInterval(timer);
                $("#stackAllow").hide();
                return;
            }

            checkAllowance();
        }, 3000);
    }).catch(function(error){
        console.log(error);
        enableBtn($("#stackAllow"));
    });
});

$("#stackConfirm").click(function(){
    let input = $("#stackAmountInput").val();
    if (isNaN(input))
        input = 0;
    let inVal = Math.round(input*100000000);

    if (inVal >= 10000000000 && balance >= inVal) {
        if (allowance >= 3003200000000000) {
            disableBtn($("#stackConfirm"));

            farmContract.methods.lock(inVal, Math.round($("#periodRange").val()*4.34524)).send()
                .on("receipt", function(result){
                updateStats()
                setTimeout(function (){
                    enableBtn($("#stackConfirm"));
                    $("#stackAmountInput").val(0);
                    notyf.success("Successfully stacked "+input + " VGO!")
                    $("#newStackBack").click()
                }, 3000)
            }).catch(function(error){
                enableBtn($("#stackConfirm"));
            });
        }
    }

});

function checkStackAmount() {
    checkReward()
    let input = $("#stackAmountInput").val();
    if (isNaN(input))
        input = 0;
    let inVal = Math.round(input*100000000);
    if (inVal >= 10000000000 && balance >= inVal) {
        if (allowance >= 3003200000000000) {
            if (!isDisabledBtn($("#stackConfirm"))) {
                $("#stackConfirm").attr("disabled", false);
            }
        }else{
            $("#stackConfirm").attr("disabled", true);
            $("#stackAllow").show();
            $("#stackAllow").attr("disabled", false);
        }
    }else{
        $("#stackConfirm").attr("disabled", true);
    }
}

function checkAllowance() {
    getAllowance(account, farmAddress).then(function (result) {
        allowance = result;
        if (allowance >= 3003200000000000) {
            $("#stackAllow").hide();
            checkStackAmount();
        }
    });
}

function formatAmount(amount){
    return amount/Math.pow(10, 8);
}

window.addEventListener('load', async () => {
    init();
    $("#stackConfirm").attr("disabled", true);
});

$("#stackAmountInput").on("input", function() {
    checkStackAmount();
});

function disableBtn(elem) {
    elem.find("val").hide();
    elem.find("i").show();
    elem.attr("disabled", true);
}

function enableBtn(elem) {
    elem.find("val").show();
    elem.find("i").hide();
    elem.attr("disabled", false);
}

function isDisabledBtn(elem) {
    return elem.find("val").css("display") == "none";
}

$("#periodRange").on("input", function(e) {
    $("#periodRangeDisp").html($("#periodRange").val().replace(/(.)(?=(\d{3})+$)/g,'$1,'));
    $("#stackAPR").html((0.25*$("#periodRange").val()*4.34524+5.2).toFixed(1) + "%")
    checkReward()
});

function checkReward(){
    let input = $("#stackAmountInput").val()

    if(input === ""){
        $("#estReward").html("-")
        return
    }

    let apy = (0.25*$("#periodRange").val()*4.34524+5.2)/100
    let duration = $("#periodRange").val()

    let estReward = Math.round((input*(1+apy)-input)/12*duration)

    $("#estReward").html((""+estReward).replace(/(.)(?=(\d{3})+$)/g,'$1,'));
}
