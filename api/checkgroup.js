export default async function handler(req, res) {
    // Pega o usuário via query (?user=) ou body
    const username = req.query.user || req.body?.username;

    if (!username) {
        return res.status(400).json({ error: "Missing user parameter" });
    }

    // Lista de devs bloqueados (não podem logar normalmente)
    const blockedDevs = ["enzopiticopileko", "RC7REMAKERYTT"];

    if (blockedDevs.includes(username)) {
        return res.status(403).json({ devBlocked: true });
    }

    try {
        // Busca o ID do usuário no Roblox
        const response = await fetch(`https://users.roblox.com/v1/usernames/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usernames: [username] })
        });

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = data.data[0].id;

        // Verifica se o usuário tá no grupo do Free Plan
        const groupCheck = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        const groups = await groupCheck.json();

        // ID do grupo Free Plan Lunyal X
        const inGroup = groups.data?.some(g => g.group?.id === 201551859) || false;

        return res.status(200).json({
            ok: true,
            username,
            userId,
            inGroup
        });

    } catch (err) {
        return res.status(500).json({ error: "Internal server error", details: err.toString() });
    }
}
