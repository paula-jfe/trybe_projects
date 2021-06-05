CREATE VIEW cancoes_premium AS
SELECT
c.cancao_nome AS nome,
COUNT(hr.cancao_id) AS reproducoes
FROM SpotifyClone.cancoes AS c
INNER JOIN SpotifyClone.historico_reproducoes AS hr
ON c.cancao_id = hr.cancao_id
INNER JOIN SpotifyClone.usuarios AS u
ON u.usuario_id = hr.usuario_id
INNER JOIN SpotifyClone.planos AS p
ON p.plano_id = u.plano_id
WHERE p.plano_nome IN ("familiar", "universitário")
GROUP BY c.cancao_nome
ORDER BY 1;
