const express = require("express");
const { Sauce } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const sauces = await Sauce.findAll();
    res.send(sauces);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sauce = await Sauce.create(req.body);
    res.status(201).send(sauce);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const sauce = await Sauce.findByPk(req.params.id);
    if (sauce) {
      res.send(sauce);
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let sauce = await Sauce.findByPk(req.params.id);
    if (sauce) {
      sauce = await sauce.update(req.body);
      res.send(sauce);
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let sauce = await Sauce.findByPk(req.params.id);
    if (sauce) {
      sauce = await sauce.destroy();
      res.status(204).send();
    } else {
      res.status(404);
      throw new Error("Not Found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
