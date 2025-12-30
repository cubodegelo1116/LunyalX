import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDypGqtLgFZ2hBhJs4a68g7hIt6G-K_SOU",
  authDomain: "lunyalx.firebaseapp.com",
  databaseURL: "https://lunyalx-default-rtdb.firebaseio.com",
  projectId: "lunyalx",
  storageBucket: "lunyalx.firebasestorage.app",
  messagingSenderId: "467203088520",
  appId: "1:467203088520:web:2fd97e16884e15e6493f3d",
  measurementId: "G-45YGMZXLG4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-dev-key');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action, password, username } = req.body;

  try {
    // Verificar senha
    if (action === 'login') {
      if (!password) {
        return res.status(400).json({ error: "Password required" });
      }

      const passwordsRef = ref(database, 'passwords');
      const snapshot = await get(passwordsRef);

      if (!snapshot.exists()) {
        return res.status(401).json({ error: "No passwords available" });
      }

      const passwords = snapshot.val();
      let foundPassword = null;
      let passwordKey = null;

      for (const key in passwords) {
        if (passwords[key].password === password && !passwords[key].used) {
          foundPassword = passwords[key];
          passwordKey = key;
          break;
        }
      }

      if (!foundPassword) {
        return res.status(401).json({ error: "Invalid or already used password" });
      }

      // Marca como usada
      await update(ref(database, `passwords/${passwordKey}`), {
        used: true,
        usedBy: username || "Anonymous",
        usedAt: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: Buffer.from(password).toString('base64')
      });
    }

    // Criar nova senha (dev panel)
    if (action === 'create-password') {
      const devKey = req.headers['x-dev-key'];
      const validDevKeys = ["dev-02JH9-KQ3L2-HF9A7", "dev-V8LQ2-9DMA2-1KXQ0"];

      if (!validDevKeys.includes(devKey)) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const newPassword = generatePassword();
      const passwordsRef = ref(database, 'passwords');
      const snapshot = await get(passwordsRef);
      const passwords = snapshot.exists() ? snapshot.val() : {};

      const newKey = Date.now().toString();
      passwords[newKey] = {
        password: newPassword,
        used: false,
        usedBy: null,
        usedAt: null,
        createdAt: new Date().toISOString()
      };

      await set(passwordsRef, passwords);

      return res.status(200).json({
        success: true,
        password: newPassword
      });
    }

    // Listar senhas (dev panel)
    if (action === 'list-passwords') {
      const devKey = req.headers['x-dev-key'];
      const validDevKeys = ["dev-02JH9-KQ3L2-HF9A7", "dev-V8LQ2-9DMA2-1KXQ0"];

      if (!validDevKeys.includes(devKey)) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const passwordsRef = ref(database, 'passwords');
      const snapshot = await get(passwordsRef);

      if (!snapshot.exists()) {
        return res.status(200).json({ passwords: {} });
      }

      return res.status(200).json({
        passwords: snapshot.val()
      });
    }

    return res.status(400).json({ error: "Invalid action" });

  } catch (error) {
    console.error("Firebase Error:", error);
    return res.status(500).json({ 
      error: "Server error",
      details: error.message 
    });
  }
}

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
