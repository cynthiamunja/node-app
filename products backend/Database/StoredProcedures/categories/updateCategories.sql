USE productsDB;
GO

CREATE OR ALTER PROCEDURE updateCategories
    @CategoryID VARCHAR(255),
    @CategoryName VARCHAR(255)
AS
BEGIN
    UPDATE Categories
    SET CategoryName = @CategoryName
    WHERE CategoryID = @CategoryID;
END;
GO
