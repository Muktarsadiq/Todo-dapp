// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  try {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying Todo contract with the account:", deployer.address);

    // Compile and deploy the Todo contract
    const Todo = await hre.ethers.getContractFactory("Todo");
    const todo = await Todo.deploy();

    //await todo.deployed();

    console.log("Todo contract address:", todo.address);
  } catch (error) {
    console.error("Error deploying Todo contract:", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
