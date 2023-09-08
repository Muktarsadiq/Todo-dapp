import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css';
import { ethers } from 'ethers';
import { providers } from "ethers"
import * as Constants from "../utils/config"

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const connectToMetamask = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);

        const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
        const tasks = await contractInstance.getAllTasks();
        setTasks(tasks);

        // Check if the connected wallet is the owner
        const owner = await contractInstance.owner();
        setIsOwner(address === owner);
      } else {
        console.log("Metamask not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);

      // Fetch tasks from the blockchain
      const fetchedTasks = await contractInstance.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    connectToMetamask();
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!window.ethereum) {
        throw new Error("Metamask not found");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);

      // Add the task to the blockchain
      await contractInstance.addTask(task, {
        value: ethers.utils.parseEther("0.001")
      });

      // Refresh the task list
      const updatedTasks = await contractInstance.getAllTasks();
      setTasks(updatedTasks);
      fetchTasks();
      setTask('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  const handleChange = (event) => {
    setTask(event.target.value);
  }

  const changeTaskStatus = async (taskId) => {
    try {
      if (!window.ethereum) {
        throw new Error("Metamask not found");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);

      // Change the task status on the blockchain
      await contractInstance.markAsFinished(taskId);

      // Refresh the task list
      const updatedTasks = await contractInstance.getAllTasks();
      setTasks(updatedTasks);
      fetchTasks();
    } catch (error) {
      console.error("Error changing task status:", error);
    }
  }

  const deleteTask = async (taskId) => {
    try {
      if (!window.ethereum) {
        throw new Error("Metamask not found");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);

      // Delete the task on the blockchain
      await contractInstance.deleteTask(taskId);

      // Refresh the task list
      const updatedTasks = await contractInstance.getAllTasks();
      setTasks(updatedTasks);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const handleWithdraw = async () => {
    try {
      if (!window.ethereum || !isOwner) {
        throw new Error("Metamask not found or you are not the owner");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);

      // Withdraw funds from the contract
      await contractInstance.withdraw();

      // Refresh the task list and update the balance
      fetchTasks();
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        Welcome to the Decentralized To-Do Application
      </div>
      <div className={styles.container}>
        {walletAddress ? (
          <div>
            Connected Wallet: {walletAddress}
          </div>
        ) : (
          <button onClick={connectToMetamask}>Connect Wallet</button>
        )}
      </div>
      {isOwner && (
        <button className={styles.button} onClick={handleWithdraw}>Withdraw</button>
      )}
      <br />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="text" name="task" placeholder="Add task here ..." onChange={handleChange} value={task} />
          <input type="submit" value="Add Task" />
        </form>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Description</th>
              <th>Task Status</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{task.desc}</td>
                <td>{task.status === 0 ? 'Pending' : 'Finished'}</td>
                <td>
                  {task.status === 0 ? (
                    <button className={styles.button} onClick={() => changeTaskStatus(index)}>Mark as Finished</button>
                  ) : null}
                </td>
                <td>
                  <button className={styles.button} onClick={() => deleteTask(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
