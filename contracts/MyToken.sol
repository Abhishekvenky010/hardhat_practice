// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
contract MyToken{
    string public name = "MyToken";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
);
    mapping(address => uint256) public balanceOf;
    constructor(){
        balanceOf[msg.sender] = 1000;
        totalSupply= 1000;
    }
    mapping(address =>
    mapping(address => uint256)
    ) public allowance;
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event transferfrom(address indexed from, address indexed to, uint256 amount);
    
    function transfer(
    address to,
    uint256 amount
)
    public
    returns (bool)
{
    require(balanceOf[msg.sender] >= amount,"insufficient funds");
    balanceOf[msg.sender] -= amount;
    balanceOf[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
}
 function approve(
    address spender,
    uint256 amount
)
    public
    returns(bool){
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    function transferFrom(
    address from,
    address to,
    uint256 amount
)
    public
    returns(bool)
{
    require(balanceOf[from] >= amount,"insufficient funds");
    require(allowance[from][msg.sender] >= amount,"allowance not enough");
    balanceOf[from] -= amount;
    balanceOf[to] += amount;
    allowance[from][msg.sender] -= amount;
    emit transferfrom(from, to, amount);    
    return true;

}
}