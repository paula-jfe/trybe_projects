USE hr;
DELIMITER $$

CREATE PROCEDURE buscar_media_por_cargo(IN cargo VARCHAR(50))

BEGIN 
SELECT
ROUND(AVG(e.SALARY), 2) AS "Média salarial"
FROM hr.jobs AS j
INNER JOIN hr.employees AS e
ON j.JOB_ID = e.JOB_ID
WHERE cargo = j.JOB_TITLE;
END $$

DELIMITER ;

CALL buscar_media_por_cargo("Programmer");
