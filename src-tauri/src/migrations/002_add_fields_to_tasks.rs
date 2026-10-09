// SQLite rejects a non-constant default (CURRENT_TIMESTAMP) on ALTER TABLE ADD COLUMN,
// so the column is added nullable, backfilled, and a trigger fills it on insert.
pub fn sql() -> &'static str {
    "
    alter table tasks add column created_datetime text;
    alter table tasks add column due_date text default null;
    update tasks set created_datetime = datetime('now') where created_datetime is null;
    create trigger tasks_created_datetime after insert on tasks
    when new.created_datetime is null
    begin
        update tasks set created_datetime = datetime('now') where id = new.id;
    end;
    "
}
