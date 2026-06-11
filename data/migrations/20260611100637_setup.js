/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tarifler", (tbl) => {
      tbl.increments("id");
      tbl.string("tarif_adi", 128).notNullable().unique();
      tbl.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("adimlar", (tbl) => {
      tbl.increments("id");
      tbl.integer("adim_sirasi").notNullable();
      tbl.string("adim_talimati").notNullable();
      tbl
        .integer("tarif_id")
        .references("id")
        .inTable("tarifler")
        .notNullable();
    })
    .createTable("icindekiler", (tbl) => {
      tbl.increments("id");
      tbl.string("icindekiler_adi").notNullable();
    })
    .createTable("adim_icindekiler", (tbl) => {
      tbl.integer("adim_id").references("id").inTable("adimlar").notNullable();
      tbl
        .integer("icindekiler_id")
        .references("id")
        .inTable("icindekiler")
        .notNullable();
      tbl.float("miktar");
      tbl.primary(["adim_id", "icindekiler_id"]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("adim_icindekiler")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("adimlar")
    .dropTableIfExists("tarifler");
};
