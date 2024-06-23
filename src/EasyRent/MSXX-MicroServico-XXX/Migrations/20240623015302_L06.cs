using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MS03.Migrations
{
    public partial class L06 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Lancamentos");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Lancamentos",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Lancamentos");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Lancamentos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
