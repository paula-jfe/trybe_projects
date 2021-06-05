DELIMITER $$

CREATE FUNCTION quantidade_musicas_no_historico(id int)
RETURNS INT READS SQL DATA
BEGIN
DECLARE numero_musicas INT;
SELECT COUNT(usuario_id)
FROM SpotifyClone.historico_reproducoes
WHERE usuario_id = id
GROUP BY usuario_id
INTO numero_musicas;
RETURN numero_musicas;
END $$

DELIMITER ;
