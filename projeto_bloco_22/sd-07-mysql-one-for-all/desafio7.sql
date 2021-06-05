CREATE VIEW perfil_artistas AS
SELECT
ar.artista_nome AS artista,
al.album_nome AS album,
COUNT(sa.usuario_id) AS seguidores
FROM SpotifyClone.albuns AS al
INNER JOIN SpotifyClone.artistas AS ar
ON al.artista_id = ar.artista_id
INNER JOIN SpotifyClone.seguindo_artistas AS sa
ON al.artista_id = sa.artista_id
GROUP BY ar.artista_nome, al.album_nome
ORDER BY 3 DESC, 1, 2;
