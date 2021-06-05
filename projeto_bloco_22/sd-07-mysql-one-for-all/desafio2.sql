CREATE VIEW estatisticas_musicais AS
SELECT
COUNT(DISTINCT c.cancao_id) AS cancoes,
COUNT(DISTINCT ar.artista_id) AS artistas,
COUNT(DISTINCT al.album_id) AS albuns
FROM SpotifyClone.albuns AS al
INNER JOIN SpotifyClone.cancoes AS c
ON c.album_id = al.album_id
INNER JOIN SpotifyClone.artistas AS ar
ON al.artista_id = ar.artista_id;
