export default async function handler(req, res) {
    const { user } = req.query;

    if (!user) {
        return res.status(400).json({ error: "Missing user parameter" });
    }

    try {
        const response = await fetch(`https://users.roblox.com/v1/usernames/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usernames: [user] })
        });

        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userId = data.data[0].id;

        const groupCheck = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        const groups = await groupCheck.json();

        const inGroup = groups.data?.some(g => g.group?.id === 34372369) || false;

        res.status(200).json({ userId, inGroup });

    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
}
