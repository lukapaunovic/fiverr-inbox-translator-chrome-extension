// Durable extension-private cache. No cookies, API keys or original source text stored here.
// Exact source hash + mode + target language + model isolate translations correctly.
const TranslationCache=(()=>{
  let database;
  function open(){return database??=new Promise((resolve,reject)=>{const r=indexedDB.open('luka-translations',1);r.onupgradeneeded=()=>r.result.createObjectStore('translations',{keyPath:'key'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>{database=null;reject(Error('Local translation cache could not be opened.'));};});}
  async function key(mode,model,language,text){const hash=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(['translation-v1',mode,model,language,text])));return [...new Uint8Array(hash)].map(x=>x.toString(16).padStart(2,'0')).join('');}
  async function get(key){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction('translations','readonly'),r=tx.objectStore('translations').get(key);r.onsuccess=()=>resolve(r.result?.value);r.onerror=()=>reject(Error('Local translation cache could not be read.'));});}
  async function put(key,value){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction('translations','readwrite');tx.objectStore('translations').put({key,value,createdAt:Date.now()});tx.oncomplete=()=>resolve();tx.onabort=tx.onerror=()=>reject(Error('Translation could not be saved to local cache. Check available disk space.'));});}
  async function count(){const db=await open();return new Promise((resolve,reject)=>{const r=db.transaction('translations').objectStore('translations').count();r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(Error('Could not count cached translations.'));});}
  async function clear(){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction('translations','readwrite');tx.objectStore('translations').clear();tx.oncomplete=()=>resolve();tx.onerror=()=>reject(Error('Could not clear cache.'));});}
  return {key,get,put,count,clear};
})();
