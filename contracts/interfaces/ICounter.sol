// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface ICounter {

    function increment() external;

    function getCount()
        external
        view
        returns(uint256);

}