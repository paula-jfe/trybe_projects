DELIMITER $$

CREATE FUNCTION exibir_quantidade_pessoas_contratadas_por_mes_e_ano (mes INT, ano INT)
RETURNS INT READS SQL DATA
BEGIN
DECLARE numero_pessoas INT;
SELECT COUNT(*)
FROM hr.employees
WHERE mes = MONTH(HIRE_DATE) AND ano = YEAR(HIRE_DATE)
INTO numero_pessoas;
RETURN numero_pessoas;
END $$

DELIMITER ;
