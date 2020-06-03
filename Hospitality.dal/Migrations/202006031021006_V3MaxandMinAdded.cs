namespace Hospitality.dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class V3MaxandMinAdded : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Patients", "Disease", c => c.String(nullable: false, maxLength: 50));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Patients", "Disease", c => c.String(nullable: false));
        }
    }
}
