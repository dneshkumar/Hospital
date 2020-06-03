namespace Hospitality.dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class V3RemoveRequiredForStatus : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Patients", "Status", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Patients", "Status", c => c.String(nullable: false));
        }
    }
}
