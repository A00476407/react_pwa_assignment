import Dexie from 'dexie';

const db = new Dexie('MyDatabase');
db.version(1).stores({
  data: '++id, item, completed, starred',
});

export default db;