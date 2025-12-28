export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Missing username" });
  }

  // Devs bloqueados de login normal
  const blockedDevs = ["enzopiticopileko", "RC7REMAKERYTT"];

  if (blockedDevs.includes(username)) {
    return res.status(403).json({ devBlocked: true });
  }

  // ID do grupo Lunyal X
  const groupId = 201551859;

  try {
    // Busca infos de grupos do usuário
    const response = await fetch(
      `https://groups.roblox.com/v1/usernames/users`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usernames: [username],
        }),
      }
    );

    const userData = await response.json();

    if (!userData.data || userData.data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userData.data[0].id;

    const groupCheck = await fetch(
      `https://groups.roblox.com/v1/users/${userId}/groups/roles`
    );

    const groupData = await groupCheck.json();

    const inGroup = groupData.data.some(g => g.group.id === groupId);

    return res.status(200).json({
      ok: true,
      username,
      userId,
      inGroup
    });

  } catch (err) {
    return res.status(500).json({ error: "Roblox API error" });
  }
}
