import AppName from "./components/AppName";
import TodoItems from "./components/TodoItems";
import "./App.css";
import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import WelcomeMessage from "./components/WelcomeMessage";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemsFromServer,
  markItemCompletedOnServer,
} from "./services/itemService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsFromServer = await getItemsFromServer();
        setTodoItems(itemsFromServer);
      } catch (error) {
        console.log("Failed to fetch from server:", error);
      }
    };
    fetchItems();
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    const item = await addItemToServer(itemName, itemDueDate);
    const newItem = { ...item, completed: false };
    const newTodoItems = [...todoItems, newItem];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id).catch((err) =>
      console.log("Failed to delete item:", err)
    );
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  const handleCompletedClick = async (id) => {
    // Find the item
    const item = todoItems.find((item) => item.id === id);
    if (!item) return;
    // Call server to mark completed (toggle)
    try {
      const updatedItem = await markItemCompletedOnServer(id);
      setTodoItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, completed: updatedItem.completed } : it
        )
      );
    } catch (err) {
      console.log("Failed to mark completed:", err);
    }
  };

  return (
    <center
      className="todo-container"
      style={{ background: "#f8f9fa", minHeight: "100vh", padding: "2rem" }}
    >
      <AppName />
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          padding: "2rem 1.5rem",
        }}
      >
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 && <WelcomeMessage />}
        <TodoItems
          todoItems={todoItems}
          onDeleteClick={handleDeleteItem}
          onCompletedClick={handleCompletedClick}
        />
      </div>
    </center>
  );
}
export default App;
