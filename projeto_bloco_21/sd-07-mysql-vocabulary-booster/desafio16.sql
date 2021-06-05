USE hr;
DELIMITER $$

CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario (newEmail VARCHAR(50))
RETURNS TINYINT READS SQL DATA
BEGIN
DECLARE counter TINYINT;
SELECT COUNT(*)
FROM job_history AS jh
INNER JOIN hr.employees AS e
ON e.EMPLOYEE_ID = jh.EMPLOYEE_ID
WHERE e.EMAIL = newEmail
INTO counter;
RETURN counter;
END $$

DELIMITER ;

SELECT buscar_quantidade_de_empregos_por_funcionario("NKOCHHAR");
