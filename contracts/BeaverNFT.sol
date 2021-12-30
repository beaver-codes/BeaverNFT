pragma solidity 0.8.10;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BeaverNFT is ERC721 {

    uint256 public totalSupply;

    mapping(uint256 => string) private _tokenUris;

    constructor() ERC721("BeaverNFT","BNFT") {
    }

    function mint() public {
        _mint(msg.sender, totalSupply);
        totalSupply += 1;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        return _tokenUris[tokenId];
    }

    function setTokenURI(uint256 tokenId, string memory tokenUri) external {
        _tokenUris[tokenId] = tokenUri
    }
}