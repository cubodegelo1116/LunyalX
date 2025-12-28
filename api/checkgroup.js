// netlify/functions/checkgroup.js
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const user = event.queryStringParameters.user;

  if (!user) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing user" }) };
  }

  try {
    const response = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [user] })
    });

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      return { statusCode: 404, body: JSON.stringify({ error: "User not found" }) };
    }

    const userId = data.data[0].id;

    const groupCheck = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
    const groups = await groupCheck.json();

    const inGroup = groups.data?.some(g => g.group?.id === 34372369) || false;

    return {
      statusCode: 200,
      body: JSON.stringify({ userId, inGroup })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error", details: err }) };
  }
};
