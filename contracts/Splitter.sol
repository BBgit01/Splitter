pragma solidity ^0.4.11;
contract Splitter {

// this contract will show balances of 3 people: Alice, Bob and Carol
// when Alice sends ether it will be split in half to Bob and Carol



	address public alice;
	address public bob;
	address public carol;
 
mapping (address => uint ) public accounts;


function Splitter(address Alice,address Bob, address Carol){

	alice = Alice;
	bob = Bob;
	carol = Carol;


}


function splitt() payable {
	if (msg.sender == alice){

          uint value = msg.value;

	  accounts[bob] = accounts[bob] + value/2;

	  accounts[carol] = accounts[carol] +  value/2;
	}
}

// payable use only when receiving money
// allow to wihdraw money only for the specific users
function withdraw()  {

	require(accounts[msg.sender] > 0);

	uint value = accounts[msg.sender];
	
// zero out the sender value
	accounts[msg.sender] = 0;
// transfer to user
	msg.sender.transfer(value);





}

function showBalance(address person) constant returns(uint) {

	return accounts[person];
}
 

}
