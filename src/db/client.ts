import Database from '@tauri-apps/plugin-sql';

// this client is supposed to be one wrapping the db class to comunicate with the backend so later on when the web version is in the work/deploye it can be synched

let db: Promise<Database> | undefined;

const wrap = (db: Database): Database => 
  new Proxy(db, {
    get(target, prop) {
      if(prop === 'execute') {
        return async (...args: Parameters<Database['execute']>) => {
          const res = await target.execute(...args);
          // over here i will in the future place the syncRemote method
          return res;
        }
      }      
      const v = Reflect.get(target, prop);
      return typeof v === "function" ? v.bind(target) : v;
    }
  });

export const getDb = () => (db ??= Database.load('sqlite:persona-os.db')).then(wrap);
