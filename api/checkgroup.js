export async function handler(event, context) {
    const user = event.queryStringParameters?.user;

    if (!user) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing user parameter" })
        };
    }

    try {
        // 1) pegar Roblox userId
        const usernameRes = await fetch("https://users.roblox.com/v1/usernames/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usernames: [user] })
        });
        const usernameData = await usernameRes.json();

        if (!usernameData.data || usernameData.data.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "User not found" })
            };
        }

        const userId = usernameData.data[0].id;

        // 2) checar grupo
        const groupRes = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        const groupData = await groupRes.json();

        const inGroup = groupData.data?.some(g => g.group?.id === 34372369) || false;

        return {
            statusCode: 200,
            body: JSON.stringify({ userId, inGroup })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Internal server error",
                message: err.message 
            })
        };
    }
}
