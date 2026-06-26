// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interfaces/ICounter.sol";

contract Counter is ICounter {

    uint256 private count;

    function increment() external override {
        count++;
    }

    function getCount()
        external
        view
        override
        returns (uint256)
    {
        return count;
    }
}