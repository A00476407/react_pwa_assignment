import db from "./db";

// insert new data
export const insertData = async (item, completed, starred) => {
  try {
    await db.data.add({ item, completed, starred });
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

// retrieve all data, return a sorted list
export const getAllData = async () => {
  try {
    const data = await db.data.toArray();
    data
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .sort((a, b) => (a.starred > b.starred ? 1 : -1))
      .sort((a, b) => (a.completed > b.completed ? 1 : -1));
    console.log(data);
    console.log("Get all data.");
    return data;
  } catch (error) {
    console.error("Error getting data:", error);
    return [];
  }
};

// update data (completed, starred)
export const updateData = async (id, completed, starred) => {
  try {
    await db.data.update(id, { completed, starred });
    console.log("Data updated successfully.");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// prioritize data (starred)
export const prioritizeData = async (id, starred) => {
  try {
    await db.data.update(id, { starred });
    console.log("Data updated successfully.");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

// delete data
export const deleteData = async (id) => {
  try {
    await db.data.delete(id);
    console.log("Data deleted successfully.");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};
