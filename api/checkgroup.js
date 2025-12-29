export default async function handler(req, res) {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    // Requisição pra API do Roblox
    const robloxRes = await fetch(`https://api.roblox.com/users/get-by-username?username=${encodeURIComponent(user)}`);
    
    if (!robloxRes.ok) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = await robloxRes.json();
    const userId = userData.Id;

    // Aqui você verifica se o usuário tá no grupo (whitelist)
    const groupRes = await fetch(`https://api.roblox.com/user/${userId}/groups`);
    const groupData = await groupRes.json();

    // ID do seu grupo (muda isso pro seu grupo)
    const groupId = 1437834972496138362; // Esse é o ID que tá no icon do Discord
    const inGroup = groupData.some(g => g.Id === groupId);

    // Lista de devs (do seu código)
    const devNicks = ["enzopiticopileko", "RC7REMAKERYTT"];
    const isDev = devNicks.includes(user.toLowerCase());

    return res.status(200).json({
      userId,
      username: user,
      inGroup,
      isDev
    });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Error connecting to API" });
  }
}
