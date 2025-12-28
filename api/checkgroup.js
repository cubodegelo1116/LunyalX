export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Faltou o username" });
  }

  // Lista de devs proibidos de logar normalmente
  const blockedDevs = ["enzopiticopileko", "RC7REMAKERYTT"];

  // Lista de chaves dev autorizadas
  const validDevKeys = [
    "dev-02JH9-KQ3L2-HF9A7",
    "dev-V8LQ2-9DMA2-1KXQ0"
  ];

  // Se o cara tentar logar usando um nome proibido sem devKey → bloqueia
  if (blockedDevs.includes(username)) {
    return res.status(403).json({ devBlocked: true });
  }

  return res.status(200).json({
    ok: true,
    username: username,
    message: "Usuário liberado"
  });
}
