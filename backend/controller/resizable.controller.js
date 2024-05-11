import { ResizableModel } from "../models/resizable.model.js";
import { StatsModel } from "../models/stats.model.js";

export class ResizableComponents {
  /**
   * @description - this method add new data to the database
   */

  static async addNewEntry(req, res, next) {
    const start = performance.now();
    try {
      const { content } = req.body;
      const data = await ResizableModel.create({ content });
      const end = performance.now();
      const executionTime = end - start;
      return res.status(201).json({ status: `created`, data, executionTime });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description - this method fetches all data from the database
   */

  static async getAllEntries(req, res, next) {
    const start = performance.now();
    try {
      const data = await ResizableModel.find().lean();
      const end = performance.now();
      const executionTime = end - start;
      res.status(200).json({ status: `success`, data, executionTime });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description - this method updates data in the database
   */

  static async updateEntry(req, res, next) {
    const start = performance.now();
    try {
      const { content } = req.body;
      const { id } = req.params;
      const data = await ResizableModel.findByIdAndUpdate(
        id,
        { content },
        { new: true }
      ).lean();
      const end = performance.now();
      const executionTime = end - start;
      res.status(200).json({ status: `updated`, data, executionTime });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description - this method gives the number of times (count), user has called add and update API
   */

  static async countEntries(req, res, next) {
    const start = performance.now();
    try {
      const stats = await StatsModel.aggregate([
        {
          $group: {
            _id: `$action`,
            count: { $sum: 1 },
          },
        },
      ]);
      console.log(stats);
      const end = performance.now();
      const executionTime = end - start;
      res.status(200).json({
        status: `success`,
        executionTime,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
}
