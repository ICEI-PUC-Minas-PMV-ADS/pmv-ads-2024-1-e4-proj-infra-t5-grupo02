using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API_Inquilino.Migrations
{
    public partial class Inquilino01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Inquilinos",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Inquilinos");
        }
    }
}
