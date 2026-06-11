const cleaner = require("knex-cleaner");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("adim_icindekiler").truncate();
  await knex("adimlar").truncate();
  await knex("icindekiler").truncate();
  await knex("tarifler").truncate();
};
