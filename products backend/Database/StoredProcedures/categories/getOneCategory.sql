USE productsDB;
GO

CREATE OR ALTER PROCEDURE getOneCategory
    @CategoryID VARCHAR(255)
AS
BEGIN
    SELECT * FROM Categories WHERE CategoryID = @CategoryID;
END;
GO
