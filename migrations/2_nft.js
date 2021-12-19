const BeaverNFT = artifacts.require("BeaverNFT");

module.exports = function (deployer) {
  deployer.deploy(BeaverNFT);
};
