use tauri_plugin_sql::{Migration, MigrationKind};

#[path = "001_init_db.rs"]
mod m001_init_db;
#[path = "002_add_fields_to_tasks.rs"]
mod m002_add_fields_to_tasks;
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
        Migration {
            version: 2,
            description: "add_fields_to_tasks",
            sql: m002_add_fields_to_tasks::sql(),
            kind: MigrationKind::Up,
        },
        // @entries
    ]
}
