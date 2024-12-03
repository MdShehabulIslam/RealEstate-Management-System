import * as clientService from "../services/clientServices.js";

export const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = await clientService.createClient(clientData);
    res.status(201).json(newClient);
  } catch (err) {
    console.error("Error adding client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
    const updatedClient = await clientService.updateClient(id, clientData);
    res.status(200).json(updatedClient);
  } catch (err) {
    console.error("Error updating client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await clientService.deleteClient(id);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchClients = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const clients = await clientService.searchClients(searchTerm);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetRentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClient = await clientService.resetRentStatus(id);
    
    if (!updatedClient) {
      return res.status(404).json({ 
        success: false,
        message: "Client not found." 
      });
    }

    return res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error in resetRentStatus controller:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to toggle rent status. Please try again.",
      error: error.message 
    });
  }
};

export const resetAllRentStatus = async (req, res) => {
  try {
    const updatedClients = await clientService.resetAllRentStatus();
    
    if (!updatedClients || updatedClients.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No clients found to update." 
      });
    }

    return res.status(200).json(updatedClients);
  } catch (error) {
    console.error("Error in resetAllRentStatus controller:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to reset rent statuses. Please try again.",
      error: error.message 
    });
  }
};