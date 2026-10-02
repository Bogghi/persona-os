use tauri_plugin_sql::{Migration, MigrationKind};

#[path = "001_init_db.rs"]
mod m001_init_db;
// @mods (bun run migration <name> inserts above this line)

// Append-only: never edit an applied migration, add the next version instead.
pub fn all() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "init db",
            sql: m001_init_db::sql(),
            kind: MigrationKind::Up,
        },
        // @entries
    ]
}
