const express = require("express");
const Tarifler = require("./tarifler-model");

const router = express.Router();

router.get("/:tarif_id", async (req, res, next) => {
  try {
    const { tarif_id } = req.params;

    const tarif = await Tarifler.idyeGoreTarifGetir(tarif_id);
    if (!tarif) {
      return res.status(404).json({ message: "Tarif bulunamadı." });
    }

    res.status(200).json(tarif);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
