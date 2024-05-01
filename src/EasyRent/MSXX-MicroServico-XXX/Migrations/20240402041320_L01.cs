using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MS03.Migrations
{
    public partial class L01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lancamentos_Lancamentos_TipoId",
                table: "Lancamentos");

            migrationBuilder.DropIndex(
                name: "IX_Lancamentos_TipoId",
                table: "Lancamentos");

            migrationBuilder.DropColumn(
                name: "TipoId",
                table: "Lancamentos");

            migrationBuilder.AddColumn<int>(
                name: "Tipo",
                table: "Lancamentos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Lancamentos");

            migrationBuilder.AddColumn<int>(
                name: "TipoId",
                table: "Lancamentos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lancamentos_TipoId",
                table: "Lancamentos",
                column: "TipoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lancamentos_Lancamentos_TipoId",
                table: "Lancamentos",
                column: "TipoId",
                principalTable: "Lancamentos",
                principalColumn: "Id");
        }
    }
}
