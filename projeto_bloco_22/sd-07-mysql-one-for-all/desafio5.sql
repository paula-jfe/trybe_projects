CREATE VIEW top_2_hits_do_momento AS
SELECT
c.cancao_nome AS cancao,
COUNT(hr.cancao_id) AS reproducoes
FROM SpotifyClone.cancoes AS c
INNER JOIN SpotifyClone.historico_reproducoes AS hr
ON hr.cancao_id = c.cancao_id
GROUP BY c.cancao_nome
ORDER BY 2 DESC, 1
LIMIT 2;
