import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const object = jateDB.transaction('jate', 'readwrite')
  const store = object.objectStore('jate');
  const request = store.add({main: content})
  const results = await request;
  return results;
}

export const getDb = async () => {
  const jateDB = await openDB('jate', 1);
  const object = jateDB.transaction('jate', 'readwrite')
  const store = object.objectStore('jate');

  const request = store.getAll();
  const results = await request;
  return results;
}

initdb();
