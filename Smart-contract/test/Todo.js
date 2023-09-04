const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");

describe("Todo", function () {
  let todo;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Todo = await ethers.getContractFactory("Todo");
    todo = await Todo.deploy();
    //await todoContract.deployed();
  });

  it("should add a task", async function () {
    await todo.addTask("Sample Task", {
      value: ethers.parseEther("0.001"),
    });
    const tasks = await todo.getAllTasks();
    expect(tasks.length).to.equal(1);
    expect(tasks[0].desc).to.equal("Sample Task");
    expect(tasks[0].status).to.equal(0); // Taskstatus.pending
  });

  it("should mark a task as finished", async function () {
    await todo.addTask("Sample Task", {
      value: ethers.parseEther("0.001"),
    });
    await todo.markAsFinished(0);
    const [desc, status] = await todo.getTask(0);
    expect(desc).to.equal("Sample Task");
    expect(status).to.equal(1); // Taskstatus.finished
  });

  it("should delete a task", async function () {
    await todo.addTask("Sample Task", {
      value: ethers.parseEther("0.001"),
    });
    await todo.deleteTask(0);
    const tasks = await todo.getAllTasks();
    expect(tasks.length).to.equal(0);
  });

  it("Should withdraw funds", async function () {
    const initialBalance = await ethers.provider.getBalance(owner.address);
    await todo.connect(addr1).addTask("Task for withdrawal", { value: ethers.parseEther("0.001") });
    await todo.withdraw();
    const finalBalance = await ethers.provider.getBalance(owner.address);

    // Compare using ethers BigNumber comparison functions
    expect(finalBalance).to.be.gt(initialBalance);
  });

  it("Should not allow non-owners to withdraw funds", async function () {
    await expect(todo.connect(addr1).withdraw()).to.be.revertedWith("You are not the owner");
  });
});
