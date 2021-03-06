// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import splitter_artifacts from '../../build/contracts/Splitter.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Splitter = contract(splitter_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;


window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
   Splitter.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];



      self.refreshBalance();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  refreshBalance: function() {
    var self = this;

    //array to hold alice carol and bob
    const people = [ { name: "alice", id: "aliceBalance" }, {name: "bob", id:"bobBalance"}, {name: "carol", id: "carolBalance"}  ]

    var meta;
    //Splitter.deployed().then(a => a.alice.call()).then(b => alice = b);
    //console.log("alice",alice);
    for(let person of people) {
      // let address = person.address;
	let user = person.name;
	console.log(user);
       let id = person.id;
   Splitter.deployed().then(function(instance) {
      meta = instance;
      return meta[user].call();
    }).then(function(address) {
      return meta.showBalance.call(address);
    }).then(function(value) {
      let balance_element = document.getElementById(id);
      balance_element.innerHTML = web3.fromWei(value.valueOf(),'ether');
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
}
  },

  // call splitter 
  sendCoin: function() {
    var self = this;
    var amount = parseInt(document.getElementById("amount").value);

    this.setStatus("Initiating transaction... (please wait)");

    var meta;
    //console.log("before splitter.deployed");
    Splitter.deployed().then(function(instance) {
      meta = instance;
	console.log("meta",meta);
      //return meta.sendCoin(receiver, amount, {from: account});
      return meta.alice.call();
       }).then(function(alice){ 
	return meta.splitt.sendTransaction({from: alice,value:web3.toWei(amount,'ether')});

    }).then(function() {
      self.setStatus("Transaction complete!");
      self.refreshBalance();
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});
