export default async function handler(req, res) {
  // Permite CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    // Requisição pra nova API do Roblox
    const robloxRes = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernames: [user],
        excludeBannedUsers: false
      })
    });

    if (!robloxRes.ok) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = await robloxRes.json();

    if (!userData.data || userData.data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userData.data[0].id;
    const username = userData.data[0].name;

    // Verificar grupo (muda o ID do grupo aqui)
    const groupId = 201551859; // MUDA ISSO PRO ID DO SEU GRUPO!
    
    const groupRes = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
    const groupData = await groupRes.json();

    const inGroup = groupData.data.some(g => g.group.id === groupId);

    // Lista de devs
    const devNicks = ["enzopiticopileko", "RC7REMAKERYTT"];
    const isDev = devNicks.includes(username.toLowerCase());

    return res.status(200).json({
      userId,
      username,
      inGroup,
      isDev,
      error: null
    });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ 
      error: "Error connecting to API",
      details: error.message 
    });
  }
}
