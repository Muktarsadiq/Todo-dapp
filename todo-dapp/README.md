

# Decentralized To-Do Application (React DApp)

## Overview

The Decentralized To-Do Application is a decentralized task management application built on the Ethereum blockchain. This DApp allows users to create, manage, and track tasks in a secure and transparent manner.

## Features

### 1. Task Management

- **Add Task**: Users can add new tasks to the application by providing a task description. A small fee (0.001 ETH) is required to create a new task.

- **Mark as Finished**: Users can mark tasks as finished when they are completed.

- **Delete Task**: Users can delete tasks that are no longer needed.

### 2. Wallet Integration

- **Connect Wallet**: Users can connect their MetaMask wallet to the DApp to perform Ethereum transactions and interact with the smart contract.

- **Connected Wallet Display**: The connected wallet address is displayed when a user is logged in.

### 3. Ownership Control

- **Withdraw Funds (Owner Only)**: The owner of the smart contract can withdraw funds from the contract by clicking the "Withdraw" button. This button is visible only to the owner.

### 4. Lazy Loading

- Components in the DApp are loaded lazily for improved performance, ensuring a smooth user experience.

### 5. Note

- In other to check if the task has been added added or marked as finished kindly note that you have to refresh the page in other for status to be updated.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd decentralized-todo-dapp

