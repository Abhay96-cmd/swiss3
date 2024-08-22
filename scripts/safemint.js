 const hre = require("hardhat");

const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {

  const rpclink = hre.network.config.url;

  const [encryptedData] = await encryptDataField(rpclink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {

  const contractAddress = "0x6E8dBab4ab4c44f52dBe0b2f7a83B6c25302DC67";

  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const contract = contractFactory.attach(contractAddress);


  const mintToken = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData("safeMint", [signer.address]), 0);
  await mintToken.wait();

  console.log("Transaction Receipt: ", mintToken);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


