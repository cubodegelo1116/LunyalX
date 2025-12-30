import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDypGqtLgFZ2hBhJs4a68g7hIt6G-K_SOU",
  authDomain: "lunyalx.firebaseapp.com",
  databaseURL: "https://lunyalx-default-rtdb.firebaseio.com",
  projectId: "lunyalx",
  storageBucket: "lunyalx.firebasestorage.app",
  messagingSenderId: "467203088520",
  appId: "1:467203088520:web:2fd97e16884e15e6493f3d"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-dev-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action, username, password } = req.body;
    const devKey = req.headers['x-dev-key'];
    const validDevKeys = ["dev-02JH9-KQ3L2-HF9A7", "dev-V8LQ2-9DMA2-1KXQ0"];

    if (action === 'create-account') {
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const accountsRef = ref(database, 'accounts');
      const snapshot = await get(accountsRef);
      const accounts = snapshot.exists() ? snapshot.val() : {};

      for (const key in accounts) {
        if (accounts[key].username === username) {
          return res.status(400).json({ error: "Username already taken" });
        }
      }

      const newId = Date.now().toString();
      accounts[newId] = {
        username,
        password,
        createdAt: new Date().toISOString()
      };

      await set(accountsRef, accounts);
      return res.status(200).json({ success: true });
    }

    if (action === 'verify-account') {
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const accountsRef = ref(database, 'accounts');
      const snapshot = await get(accountsRef);
      const accounts = snapshot.exists() ? snapshot.val() : {};

      for (const key in accounts) {
        if (accounts[key].username === username && accounts[key].password === password) {
          return res.status(200).json({ success: true });
        }
      }

      return res.status(401).json({ error: "Invalid username or password" });
    }

    if (action === 'verify-dev-key') {
      if (!validDevKeys.includes(devKey)) {
        return res.status(403).json({ error: "Invalid dev key" });
      }
      return res.status(200).json({ success: true });
    }

    if (action === 'delete-account') {
      if (!validDevKeys.includes(devKey)) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      if (!username) {
        return res.status(400).json({ error: "Username required" });
      }

      const accountsRef = ref(database, 'accounts');
      const snapshot = await get(accountsRef);
      const accounts = snapshot.exists() ? snapshot.val() : {};

      let found = false;
      for (const key in accounts) {
        if (accounts[key].username === username) {
          delete accounts[key];
          found = true;
          break;
        }
      }

      if (!found) {
        return res.status(404).json({ error: "Account not found" });
      }

      await set(accountsRef, accounts);
      return res.status(200).json({ success: true });
    }

    if (action === 'list-accounts') {
      if (!validDevKeys.includes(devKey)) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const accountsRef = ref(database, 'accounts');
      const snapshot = await get(accountsRef);
      return res.status(200).json({ accounts: snapshot.exists() ? snapshot.val() : {} });
    }

    if (action === 'create-password') {
      if (!validDevKeys.includes(devKey)) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const newPassword = generatePassword();
      const passwordsRef = ref(database, 'passwords');
      const snapshot = await get(passwordsRef);
      const passwords = snapshot.exists() ? snapshot.val() : {};

      passwords[Date.now().toString()] = {
        password: newPassword,
        used: false,
        createdAt: new Date().toISOString()
      };

      await set(passwordsRef, passwords);
      return res.status(200).json({ success: true, password: newPassword });
    }

    return res.status(400).json({ error: "Invalid action" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
}
