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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented');
  const jateDB = await openDB('jate', 1);
  const object = jateDB.transaction('jate', 'readwrite')
  const store = object.objectStore('jate');
  console.log(store.key);
  const request = store.add({main: content})
  const results = await request;
  console.log(results);
  return results;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');
  const jateDB = await openDB('jate', 1);
  const object = jateDB.transaction('jate', 'readwrite')
  const store = object.objectStore('jate');

  const request = store.getAll();
  const results = await request;
  console.log(results);
  return results;
}

initdb();
