import express from "express";
import * as clientController from "../controllers/clientController.js";

const router = express.Router();

// Search route
router.get("/clients/search", clientController.searchClients);

// Reset all rent statuses route
router.post("/clients/reset-rent-status", clientController.resetAllRentStatus);

// Individual client routes
router.get("/clients", clientController.getClients);
router.post("/clients", clientController.createClient);
router.put("/clients/:id", clientController.updateClient);
router.delete("/clients/:id", clientController.deleteClient);

// Reset individual client rent status
router.put("/clients/:id/reset-rent", clientController.resetRentStatus);

export default router;
