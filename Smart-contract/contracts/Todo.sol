// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Todo {
    enum Taskstatus {
        pending,
        finished
    }

    address public owner;
    struct Task {
        string desc;
        Taskstatus status;
    }

    Task[] public tasks;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    function addTask(string memory _desc) public payable {
        require(
            msg.value == 0.001 ether,
            "Must send exactly 0.001 ETH with task addition"
        );
        tasks.push(Task(_desc, Taskstatus.pending));
    }

    function markAsFinished(uint256 id) public {
        require(id < tasks.length, "Task does not exist");
        tasks[id].status = Taskstatus.finished;
    }

    function deleteTask(uint256 id) public {
        require(id < tasks.length, "Task does not exist");

        // Move the last task to the position of the deleted task
        tasks[id] = tasks[tasks.length - 1];

        // Remove the last task (which is now a duplicate)
        tasks.pop();
    }

    function getAllTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getTask(uint256 id)
        public
        view
        returns (string memory, Taskstatus)
    {
        require(id < tasks.length, "Task does not exist");
        return (tasks[id].desc, tasks[id].status);
    }

    function withdraw() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No Ether available for withdrawal");

        (bool success, ) = owner.call{value: contractBalance}("");
        require(success, "Withdrawal failed");
    }
}
