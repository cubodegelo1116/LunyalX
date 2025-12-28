<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lunyal X Server Side</title>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, sans-serif;
        color: #fff;
        background: linear-gradient(135deg, rgb(15,15,30), rgb(0,0,0));
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: background 0.5s ease;
    }

    header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        background: rgba(0,0,0,0.4);
        border-bottom: 2px solid rgba(255,255,255,0.15);
    }

    .logo img {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        box-shadow: 0 0 8px rgba(0,0,0,0.8);
        margin-left: 20px;
    }

    nav {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-right: 40px;
    }

    nav button {
        background: rgba(255,255,255,0.1);
        border: 1px solid #fff;
        color: #fff;
        padding: 8px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
        font-size: 0.9rem;
    }

    nav button:hover {
        background: rgba(255,255,255,0.25);
    }

    main {
        flex: 1;
        width: 100%;
        max-width: 1100px;
        display: flex;
        gap: 40px;
        padding: 40px;
    }

    .sidebar {
        width: 200px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .sidebar button {
        width: 100%;
        padding: 10px;
        text-align: left;
        background: rgba(255,255,255,0.1);
        border: 1px solid #fff;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
        transition: 0.3s;
    }

    .sidebar button:hover {
        background: rgba(255,255,255,0.2);
    }

    .sidebar button.active {
        background: rgba(255,255,255,0.35);
    }

    .content {
        flex: 1;
        background: rgba(0,0,0,0.55);
        padding: 25px;
        border-radius: 12px;
        display: none;
        animation: fade 0.4s ease;
    }

    .content.active {
        display: block;
    }

    @keyframes fade {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .login-box {
        margin-top: 20px;
        padding: 15px;
        background: rgba(255,255,255,0.1);
        border-radius: 10px;
    }

    input {
        padding: 8px;
        width: 220px;
        border-radius: 5px;
        border: none;
        margin-right: 10px;
    }

    .plan {
        background: rgba(255,255,255,0.1);
        padding: 20px;
        border-radius: 10px;
        margin-top: 10px;
    }
</style>
</head>
<body>

<header>
    <div class="logo">
        <img src="https://cdn.discordapp.com/icons/1437834972496138362/bd33d3b2579cfbd7c0cd2bf0a109e195.webp?size=64" alt="LunyalX Logo">
    </div>

    <nav>
        <button onclick="window.open('https://discord.gg/R5fNXbBg','_blank')">Discord</button>
    </nav>
</header>

<main>

    <div class="sidebar">
        <button class="tab-btn active" data-tab="home">Home</button>
        <button class="tab-btn" data-tab="tos">TOS</button>
        <button class="tab-btn" data-tab="plans">Plans</button>
        <button class="tab-btn" data-tab="dashboard">Dashboard</button>
        <button class="tab-btn" data-tab="devpanel">Dev Panel</button>
    </div>

    <!-- HOME -->
    <div class="content active" id="home">
        <h1>Lunyal X Server Side</h1>
        <p>Welcome to Lunyal X Server Side, the best serverside you can find!</p>
    </div>

    <!-- TOS -->
    <div class="content" id="tos">
        <h1>TOS</h1>
        <hr><br>
        <h2>Rules</h2>
        <p>
            Do not use HappyHub or k00pguis.<br>
            No mass kick/ban.<br>
            Abuse is allowed in free & standard plan.<br>
            Shutdown game after destruction.<br>
            TP only allowed if 10+ players.
        </p>
        <hr><br>

        <h2>Blacklist Punishments</h2>
        <p>
            HappyHub/k00pguis = 1 day blacklist.<br>
            Repeated = 7 days blacklist.<br>
            TP >10 score = 2 days blacklist.<br>
            Repeated = 10 days blacklist.
        </p>
    </div>

    <!-- PLANS -->
    <div class="content" id="plans">
        <h1>Plans</h1>
        <div class="plan">
            <h2>Free Plan</h2>
            <p>Access via Discord and whitelist.</p>
            <button onclick="window.open('https://discord.gg/R5fNXbBg','_blank')">Join Discord</button>
        </div>
        <div class="plan">
            <h2>Standard Plan</h2>
            <p>Coming soon.</p>
        </div>
    </div>

    <!-- DASHBOARD -->
    <div class="content" id="dashboard">
        <h1>Dashboard</h1>

        <div id="userinfo"></div>

        <div class="login-box">
            <h3>Login</h3>
            <input id="username" placeholder="Roblox Username">
            <button onclick="login()">Login</button>
            <p id="loginmsg"></p>
        </div>
    </div>

    <!-- DEV PANEL -->
    <div class="content" id="devpanel">
        <h1>Dev Panel</h1>

        <p>Enter dev-key:</p>
        <input id="devkey" placeholder="dev-XXXXX-XXXXX-XXXXX">
        <button onclick="checkDev()">Access Panel</button>

        <p id="devmsg"></p>
    </div>

</main>

<script>
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.content');

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        tabs.forEach(b => b.classList.remove("active"));
        sections.forEach(s => s.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

// DEV NICKS BLOQUEADOS
const devNicks = ["enzopiticopileko", "RC7REMAKERYTT"];

// DEV KEYS
const validDevKeys = [
    "dev-02JH9-KQ3L2-HF9A7",
    "dev-V8LQ2-9DMA2-1KXQ0"
];

async function login() {
    const user = document.getElementById("username").value.trim();
    const msg = document.getElementById("loginmsg");

    if (!user) return msg.innerText = "Enter a username.";

    if (devNicks.includes(user)) {
        msg.innerText = "This username is protected.";
        return;
    }

    msg.innerText = "Checking whitelist...";

    const res = await fetch(`/api/checkgroup?user=${user}`);
    const data = await res.json();

    if (data.error) {
        msg.innerText = "User not found.";
        return;
    }

    const whitelisted = data.inGroup === true;

    document.getElementById("userinfo").innerHTML = `
        <h2>User: ${user}</h2>
        <p>Whitelist: ${whitelisted ? "Free Plan" : "None"}</p>
    `;

    msg.innerText = "Login successful!";
}

function checkDev() {
    const key = document.getElementById("devkey").value.trim();
    const msg = document.getElementById("devmsg");

    if (validDevKeys.includes(key)) {
        msg.innerText = "Access granted. Dev Panel unlocked.";
    } else {
        msg.innerText = "Invalid dev key.";
    }
}
</script>

</body>
</html>
