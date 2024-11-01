const VoteCasting = artifacts.require("VoteCasting");

module.exports = function(deployer) {
  deployer.deploy(VoteCasting);
};