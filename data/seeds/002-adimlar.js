/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("adimlar").insert([
    { adim_sirasi: 1, adim_talimati: "500gr kıymayı yoğurun", tarif_id: 1 },
    {
      adim_sirasi: 2,
      adim_talimati: "Şişe geçirip ızgaraya koyun",
      tarif_id: 1,
    },
    {
      adim_sirasi: 1,
      adim_talimati: "300gr kıymayı soğan ve baharatla karıştırın",
      tarif_id: 2,
    },
    {
      adim_sirasi: 2,
      adim_talimati: "Hamuru açıp üzerine kıymayı yayın",
      tarif_id: 2,
    },
    {
      adim_sirasi: 3,
      adim_talimati: "Domatesleri ve biberleri ince doğrayın",
      tarif_id: 2,
    },
    {
      adim_sirasi: 1,
      adim_talimati: "Hamuru ince açıp küçük kareler kesin",
      tarif_id: 3,
    },
    {
      adim_sirasi: 2,
      adim_talimati: "Her kareye az miktarda kıyma koyup kapatın",
      tarif_id: 3,
    },
    {
      adim_sirasi: 3,
      adim_talimati: "Kaynar suda 10 dakika haşlayın",
      tarif_id: 3,
    },
  ]);
};
