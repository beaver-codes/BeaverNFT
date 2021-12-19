pragma solidity 0.8.10;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BeaverNFT is ERC721 {

    uint256 public totalSupply;

    constructor() ERC721("BeaverNFT","BNFT") {
    }

    function mint() public {
        _mint(msg.sender, totalSupply);
        totalSupply += 1;
    }
}