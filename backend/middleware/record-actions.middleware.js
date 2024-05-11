import { StatsModel } from "../models/stats.model.js";

export const recordActionsMiddleware = async (req, res, next) => {
  try {
    // Only record POST and PUT requests
    const RECORDABLE_METHODS = [`POST`, `PUT`];
    const method = req.method;

    console.log(`Recording action...`, method);
    // If the method is not in the RECORDABLE_METHODS array, skip recording
    if (!RECORDABLE_METHODS.includes(method)) return next();

    // Record the action
    await StatsModel.create({ action: method });

    // Continue to the next middleware
    return next();
  } catch (error) {
    next(error);
  }
};
