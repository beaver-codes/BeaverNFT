pragma solidity 0.8.10;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BeaverNFT is ERC721 {

    uint256 public totalSupply;

    constructor() ERC721("BeaverNFT","BNFT") {
    }

    function mint() public {
        _mint(msg.sender, totalSupply);
        totalSupply += 1;
    }

    function tokenURI(uint256 tokenId) public pure override returns (string memory) {
        return string(abi.encodePacked("https://raw.githubusercontent.com/beaver-codes/BeaverNFT/master/assets/beaverNFT_", Strings.toString(tokenId) , ".json"));

    }
}