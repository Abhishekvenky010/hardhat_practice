import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
contract NFTVault is IERC721Receiver{
    function onERC721Received(
        address operator, 
        address from,
        uint256 tokenId,
        bytes calldata data)  
        external
        override
        returns (bytes4){
             return this.onERC721Received.selector;
        }
}