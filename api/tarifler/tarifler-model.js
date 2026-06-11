const db = require("../../data/db-config");

const idyeGoreTarifGetir = (tarif_id) => {
  return db("tarifler as t")
    .join("adimlar as a", "t.id", "a.tarif_id")
    .leftJoin("adim_icindekiler as ai", "a.id", "ai.adim_id")
    .leftJoin("icindekiler as i", "ai.icindekiler_id", "i.id")
    .where("t.id", tarif_id)
    .select(
      "t.id as tarif_id",
      "t.tarif_adi",
      "t.kayit_tarihi",
      "a.id as adim_id",
      "a.adim_sirasi",
      "a.adim_talimati",
      "i.id as icindekiler_id",
      "i.icindekiler_adi",
      "ai.miktar",
    )
    .then((rows) => {
      const tarif = {
        tarif_id: rows[0].tarif_id,
        tarif_adi: rows[0].tarif_adi,
        kayit_tarihi: rows[0].kayit_tarihi,
        adimlar: [],
      };

      rows.forEach((row) => {
        // bu adım daha önce eklendi mi?
        let adim = tarif.adimlar.find((a) => a.adim_id === row.adim_id);

        if (!adim) {
          // yoksa yeni adım ekle
          adim = {
            adim_id: row.adim_id,
            adim_sirasi: row.adim_sirasi,
            adim_talimati: row.adim_talimati,
            icindekiler: [],
          };
          tarif.adimlar.push(adim);
        }

        // malzeme varsa ekle
        if (row.icindekiler_id) {
          adim.icindekiler.push({
            icindekiler_id: row.icindekiler_id,
            icindekiler_adi: row.icindekiler_adi,
            miktar: row.miktar,
          });
        }
      });

      return tarif;
    });
};

module.exports = { idyeGoreTarifGetir };
