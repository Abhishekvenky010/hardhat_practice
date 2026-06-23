// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
contract  SimpleStorage{
    uint private number;
    address public owner;
    event NumberStored(uint256 value);
    constructor (){
        owner = msg.sender;
    }
    error NotOwner();
    modifier onlyOwner(){
        if(msg.sender != owner){
            revert NotOwner();
        }
        _;
    }
    function store(uint256 _number) public onlyOwner{
           
           number  = _number;
           emit NumberStored(_number);
    }

    function getnumber() public view returns(uint256){
          return number;
    }
}