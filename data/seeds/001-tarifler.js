/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("tarifler").insert([
    { tarif_adi: "Adana Kebap" },
    { tarif_adi: "Lahmacun" },
    { tarif_adi: "Mantı" },
  ]);
};
