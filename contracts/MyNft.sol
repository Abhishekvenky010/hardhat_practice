// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract MyNFT {

    string public name = "My NFT";

    string public symbol = "MNFT";

    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => address) public approved;
    event Transfer(
        address indexed from,
        address indexed to,
        uint indexed tokenId
    );
     event approval(
        address indexed from,
        address indexed to,
        uint indexed tokenId
    );
    function mint(
        address to,
        uint256 tokenId
    ) public {
         require(ownerOf[tokenId] == address(0),"NFT already exist");
         ownerOf[tokenId] = to;
         emit Transfer(address(0),to,tokenId);
    }
    function transfer(
    address to,
    uint256 tokenId
)
    public
{
    require(
        ownerOf[tokenId] == msg.sender,
        "Not owner"
    );

    require(
        to != address(0),
        "Invalid address"
    );

    ownerOf[tokenId] = to;

    emit Transfer(
        msg.sender,
        to,
        tokenId
    );
}

function approve(address to, uint256 tokenId)public {
    require(
        ownerOf[tokenId] == msg.sender,
        "Not owner"
    );

    approved[tokenId] = to;

    emit approval(
        msg.sender,
        to,
        tokenId
    );
}
function transferFrom(
    address from,
    address to,
    uint256 tokenId
)
    public{
        require(to!=address(0), "invalid address");
        require(
        ownerOf[tokenId] == from,
        "From is not owner"
    );
          require(
        msg.sender == from ||
        approved[tokenId] == msg.sender,
        "Not authorized"
    );

    ownerOf[tokenId] = to;
    delete approved[tokenId];

    emit Transfer(
        from,
        to,
        tokenId
    );
    }
}