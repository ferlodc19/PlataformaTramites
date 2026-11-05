using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TramitesApi.Migrations
{
    /// <inheritdoc />
    public partial class AgregaNombreyCurpARegistros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Folio",
                table: "Registros",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Curp",
                table: "Registros",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NombreCompleto",
                table: "Registros",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Curp",
                table: "Registros");

            migrationBuilder.DropColumn(
                name: "NombreCompleto",
                table: "Registros");

            migrationBuilder.AlterColumn<string>(
                name: "Folio",
                table: "Registros",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
