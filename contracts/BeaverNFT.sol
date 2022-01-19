pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract BeaverNFT is ERC721Enumerable {
    constructor() ERC721("BeaverNFT", "BNFT") {}

    function mint() public {
        _mint(msg.sender, totalSupply());
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "https://raw.githubusercontent.com/beaver-codes/BeaverNFT/master/assets/beaverNFT_",
                    Strings.toString(tokenId),
                    ".json"
                )
            );
    }
}
