const hre = require("hardhat");

async function main() {
  const erc721 = await hre.ethers.deployContract("MyToken");
  await erc721.waitForDeployment();
  
  console.log(`erc721 contract was deployed to ${erc721.target}`)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 
