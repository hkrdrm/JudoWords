SET IDENTITY_INSERT SnapConnect.dbo.proposals ON

INSERT INTO [SnapConnect-beta].[dbo].[proposal_cart]
     (
       [id]
      ,[proposal_id]
      ,[product_id]
      ,[quantity]
      ,[deleted]
     )

SELECT 
   [id]
  ,[proposalId]
  ,[productId]
  ,[qty]
  ,0 as [deleted]
  FROM [TPISQL].[Utilities].[dbo].[TPX_Security_Proposals]
