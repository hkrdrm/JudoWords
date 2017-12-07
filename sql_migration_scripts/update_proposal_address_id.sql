Update [SnapConnect].[dbo].[proposals] 
set physical_address_id = 
	(SELECT [id] FROM [SnapConnect].[dbo].[addresses] WHERE customer_id = SnapConnect.dbo.proposals.customer_id AND alias_label = 'Physical Address')
	
Update [SnapConnect].[dbo].[proposals] 
set billing_address_id = 
	(SELECT [id] FROM [SnapConnect].[dbo].[addresses] WHERE customer_id = SnapConnect.dbo.proposals.customer_id AND alias_label = 'Billing Address')
