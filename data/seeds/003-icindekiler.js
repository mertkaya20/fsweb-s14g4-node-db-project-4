/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("icindekiler").insert([
    { icindekiler_adi: "Kıyma" },
    { icindekiler_adi: "Soğan" },
    { icindekiler_adi: "Biber" },
    { icindekiler_adi: "Domates" },
    { icindekiler_adi: "Hamur" },
    { icindekiler_adi: "Yoğurt" },
    { icindekiler_adi: "Baharat" },
  ]);
};
