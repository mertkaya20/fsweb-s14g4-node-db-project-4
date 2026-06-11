/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("adim_icindekiler").insert([
    { adim_id: 1, icindekiler_id: 1, miktar: 500 }, // Adana - kıyma 500gr
    { adim_id: 1, icindekiler_id: 7, miktar: 10 }, // Adana - baharat 10gr
    { adim_id: 3, icindekiler_id: 1, miktar: 300 }, // Lahmacun - kıyma 300gr
    { adim_id: 3, icindekiler_id: 2, miktar: 100 }, // Lahmacun - soğan 100gr
    { adim_id: 3, icindekiler_id: 7, miktar: 5 }, // Lahmacun - baharat 5gr
    { adim_id: 4, icindekiler_id: 5, miktar: 200 }, // Lahmacun - hamur 200gr
    { adim_id: 5, icindekiler_id: 4, miktar: 150 }, // Lahmacun - domates 150gr
    { adim_id: 5, icindekiler_id: 3, miktar: 50 }, // Lahmacun - biber 50gr
    { adim_id: 6, icindekiler_id: 5, miktar: 300 }, // Mantı - hamur 300gr
    { adim_id: 7, icindekiler_id: 1, miktar: 200 }, // Mantı - kıyma 200gr
    { adim_id: 8, icindekiler_id: 6, miktar: 100 }, // Mantı - yoğurt 100gr
  ]);
};
