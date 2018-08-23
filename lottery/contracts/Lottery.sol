pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function pickWinner() public restricted returns (address) {
        uint i = random() % players.length;
        players[i].transfer(this.balance);
        
        // reset lottery state
        players = new address[](0);
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, block.timestamp, players));
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
}