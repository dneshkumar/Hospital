namespace Hospitality.dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class V2RequiredValidation : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Patients", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Patients", "Address", c => c.String(nullable: false));
            AlterColumn("dbo.Patients", "Gender", c => c.String(nullable: false));
            AlterColumn("dbo.Patients", "Mobile", c => c.String(nullable: false));
            AlterColumn("dbo.Patients", "Disease", c => c.String(nullable: false));
            AlterColumn("dbo.Patients", "Status", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Patients", "Status", c => c.String());
            AlterColumn("dbo.Patients", "Disease", c => c.String());
            AlterColumn("dbo.Patients", "Mobile", c => c.String());
            AlterColumn("dbo.Patients", "Gender", c => c.String());
            AlterColumn("dbo.Patients", "Address", c => c.String());
            AlterColumn("dbo.Patients", "Name", c => c.String());
        }
    }
}
