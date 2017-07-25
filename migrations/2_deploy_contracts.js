var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Splitter = artifacts.require("./Splitter.sol");

module.exports = function(deployer,network,accounts) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  alice=web3.eth.accounts[0];
  bob=web3.eth.accounts[1];
  carol=web3.eth.accounts[2];

  deployer.deploy(Splitter,alice,bob,carol);
};
