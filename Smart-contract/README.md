# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
### 1. Overview 

--This is a Decentralized ToDo Smart Contract that allows uers to add tasks, mark them as finished, and also delete task that have been completed, this smart contract also requires a certain amount in other for a tasks to be added to the list. this smart contract also has a withdraw function that let's only the owner of the smart conntract to withdraw the funds from the app.