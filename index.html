<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lunyal X Server Side</title>

<link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet">

<style>
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:Arial, sans-serif;
    }

    body{
        background:#0a0a0f;
        color:white;
        height:100vh;
        display:flex;
    }

    /* SIDEBAR */
    .sidebar{
        width:230px;
        background:#0d0d14;
        border-right:1px solid #161621;
        padding:25px 20px;
        display:flex;
        flex-direction:column;
        gap:15px;
    }

    .sidebar h1{
        font-size:1.4rem;
        margin-bottom:10px;
        text-align:center;
    }

    .nav-btn{
        display:flex;
        align-items:center;
        gap:10px;
        padding:12px;
        background:#10101a;
        border:1px solid #1b1b28;
        color:white;
        border-radius:8px;
        cursor:pointer;
        transition:.3s;
    }

    .nav-btn:hover{
        background:#1c1c2c;
    }

    .nav-btn.active{
        background:#27273d;
        border-color:#3f3f60;
    }

    .nav-btn i{
        font-size:20px;
    }

    /* HEADER */
    header{
        width:100%;
        background:#0d0d14;
        border-bottom:1px solid #161621;
        padding:15px 25px;
        display:flex;
        justify-content:space-between;
        align-items:center;
    }

    header img{
        width:50px;
        height:50px;
        border-radius:10px;
    }

    .discord-btn{
        background:#5865F2;
        color:white;
        border:none;
        padding:10px 18px;
        border-radius:8px;
        font-size:15px;
        cursor:pointer;
        transition:.3s;
    }

    .discord-btn:hover{
        background:#4752c4;
    }

    /* CONTENT */
    .content-area{
        flex:1;
        display:flex;
        flex-direction:column;
        height:100vh;
    }

    .page{
        display:none;
        padding:30px;
        overflow-y:auto;
        animation:fade .3s ease;
    }

    .page.active{
        display:block;
    }

    @keyframes fade{
        from{opacity:0; transform:translateY(10px);}
        to{opacity:1; transform:translateY(0);}
    }

    /* BOX */
    .box{
        background:#10101a;
        border:1px solid #222232;
        padding:20px;
        border-radius:10px;
        margin-top:20px;
    }

    input{
        background:#1a1a26;
        border:1px solid #2a2a3a;
        padding:10px;
        color:white;
        border-radius:6px;
        width:250px;
        outline:none;
    }

    button{
        padding:10px 15px;
        background:#27273d;
        border:1px solid #3a3a55;
        color:white;
        border-radius:8px;
        cursor:pointer;
    }

    button:hover{
        background:#3a3a55;
    }
</style>
</head>
<body>

<!-- LEFT MENU -->
<div class="sidebar">
    <h1>Lunyal X</h1>

    <button class="nav-btn active" data-page="home"><i class="ri-home-4-line"></i> Home</button>
    <button class="nav-btn" data-page="tos"><i class="ri-file-text-line"></i> TOS</button>
    <button class="nav-btn" data-page="plans"><i class="ri-vip-diamond-line"></i> Planos</button>
    <button class="nav-btn" data-page="dashboard"><i class="ri-dashboard-line"></i> Dashboard</button>
    <button class="nav-btn" data-page="devpanel"><i class="ri-terminal-box-line"></i> Dev Panel</button>
</div>

<div class="content-area">

<header>
    <img src="https://cdn.discordapp.com/icons/1437834972496138362/bd33d3b2579cfbd7c0cd2bf0a109e195.webp?size=64">
    <button class="discord-btn" onclick="window.open('https://discord.gg/R5fNXbBg','_blank')">Discord</button>
</header>

<!-- HOME -->
<div class="page active" id="home">
    <h1>Bem-vindo ao Lunyal X SS</h1>
    <p>A nova geração de serverside.</p>
</div>

<!-- TOS -->
<div class="page" id="tos">
    <h1>Termos de Uso</h1>

    <div class="box">
        <h2>Regras</h2>
        <p>
            • Não usar HappyHub ou k00pguis.<br>
            • Sem mass kick/ban.<br>
            • Abuse permitido no Free & Standard.<br>
            • Shutdown pós destruição.<br>
            • TP só com 10+ players.
        </p>
    </div>

    <div class="box">
        <h2>Punições</h2>
        <p>
            • HH/k00pguis = 1 dia BL.<br>
            • Repetiu = 7 dias.<br>
            • TP >10 score = 2 dias.<br>
            • Repetiu = 10 dias.
        </p>
    </div>
</div>

<!-- PLANS -->
<div class="page" id="plans">
    <h1>Planos Disponíveis</h1>

    <div class="box">
        <h2>Free Plan</h2>
        <p>Acesso via Discord e whitelist do grupo.</p>
        <button onclick="window.open('https://discord.gg/R5fNXbBg','_blank')">Entrar no Discord</button>
    </div>

    <div class="box">
        <h2>Standard</h2>
        <p>Em breve.</p>
    </div>
</div>

<!-- DASHBOARD -->
<div class="page" id="dashboard">
    <h1>Dashboard</h1>

    <div id="userinfo"></div>

    <div class="box">
        <h3>Login</h3>
        <input id="username" placeholder="Nick do Roblox">
        <button onclick="login()">Logar</button>
        <p id="loginmsg"></p>
    </div>
</div>

<!-- DEV PANEL -->
<div class="page" id="devpanel">
    <h1>Dev Panel</h1>

    <div class="box">
        <input id="devkey" placeholder="dev-XXXXX-XXXXX-XXXXX">
        <button onclick="checkDev()">Entrar</button>
        <p id="devmsg"></p>
    </div>
</div>

</div>

<script>
const pages = document.querySelectorAll(".page");
const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        pages.forEach(p => p.classList.remove("active"));
        buttons.forEach(b => b.classList.remove("active"));
        document.getElementById(btn.dataset.page).classList.add("active");
        btn.classList.add("active");
    });
});

// DEV PROTEÇÃO
const devNicks = ["enzopiticopileko", "RC7REMAKERYTT"];

const validDevKeys = [
    "dev-02JH9-KQ3L2-HF9A7",
    "dev-V8LQ2-9DMA2-1KXQ0"
];

async function login(){
    const user = document.getElementById("username").value.trim();
    const msg = document.getElementById("loginmsg");

    if(!user){
        msg.innerText = "Digite um nick válido.";
        return;
    }

    if(devNicks.includes(user)){
        msg.innerText = "Esse nick é protegido.";
        return;
    }

    msg.innerText = "Checando whitelist...";

    const req = await fetch(`/api/checkgroup?user=${user}`);
    const data = await req.json();

    if(data.error){
        msg.innerText = "Usuário não encontrado.";
        return;
    }

    const whitelisted = data.inGroup === true;

    document.getElementById("userinfo").innerHTML = `
        <div class='box'>
            <h2>Usuário: ${user}</h2>
            <p>Whitelist: ${whitelisted ? "Free Plan" : "Nenhuma"}</p>
        </div>
    `;

    msg.innerText = "Logado com sucesso!";
}

function checkDev(){
    const key = document.getElementById("devkey").value.trim();
    const msg = document.getElementById("devmsg");

    if(validDevKeys.includes(key)){
        msg.innerText = "Dev liberado ✓";
    } else {
        msg.innerText = "Dev key inválida.";
    }
}
</script>

</body>
</html>
