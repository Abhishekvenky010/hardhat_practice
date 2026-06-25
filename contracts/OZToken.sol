// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OZToken is ERC20 {

    constructor() ERC20("OpenZeppelin Token", "OZT") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

}