export default async function handler(req, res) {
    const { user } = req.query;

    if (!user) {
        return res.status(400).json({ error: "Missing username." });
    }

    try {
        // 1. Pega o ID da conta pelo nickname
        const userRes = await fetch(`https://api.roblox.com/users/get-by-username?username=${user}`);
        const userData = await userRes.json();

        if (!userData || !userData.Id) {
            return res.status(404).json({ error: "User not found." });
        }

        const userId = userData.Id;

        // 2. Verifica se o usuário está no grupo
        // ID do grupo LunyalX Oficial: 201551859
        const groupRes = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        const groupData = await groupRes.json();

        const inGroup = groupData.data?.some(g => g.group.id === 201551859) || false;

        res.status(200).json({
            userId,
            inGroup
        });

    } catch (err) {
        res.status(500).json({
            error: "Internal server error.",
            details: err.message
        });
    }
}
