using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TramitesApi.Migrations
{
    /// <inheritdoc />
    public partial class EsquemaNormalizado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Registros",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Folio = table.Column<string>(type: "text", nullable: true),
                    FechaRegistro = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Registros", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Archivos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RegistroId = table.Column<int>(type: "integer", nullable: false),
                    RutaPdf = table.Column<string>(type: "text", nullable: true),
                    RutaTxt = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Archivos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Archivos_Registros_RegistroId",
                        column: x => x.RegistroId,
                        principalTable: "Registros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DatosEconomicos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RegistroId = table.Column<int>(type: "integer", nullable: false),
                    SituacionLaboral = table.Column<string>(type: "text", nullable: true),
                    Ocupacion = table.Column<string>(type: "text", nullable: true),
                    Empresa = table.Column<string>(type: "text", nullable: true),
                    DependientesEconomicos = table.Column<int>(type: "integer", nullable: false),
                    IngresoMensual = table.Column<decimal>(type: "numeric", nullable: false),
                    EgresoMensual = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DatosEconomicos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DatosEconomicos_Registros_RegistroId",
                        column: x => x.RegistroId,
                        principalTable: "Registros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DatosPersonales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RegistroId = table.Column<int>(type: "integer", nullable: false),
                    Nombres = table.Column<string>(type: "text", nullable: true),
                    Apellidos = table.Column<string>(type: "text", nullable: true),
                    FechaNacimiento = table.Column<string>(type: "text", nullable: true),
                    Sexo = table.Column<string>(type: "text", nullable: true),
                    Curp = table.Column<string>(type: "text", nullable: true),
                    EstadoCivil = table.Column<string>(type: "text", nullable: true),
                    Telefono = table.Column<string>(type: "text", nullable: true),
                    Correo = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DatosPersonales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DatosPersonales_Registros_RegistroId",
                        column: x => x.RegistroId,
                        principalTable: "Registros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Domicilios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RegistroId = table.Column<int>(type: "integer", nullable: false),
                    CodigoPostal = table.Column<string>(type: "text", nullable: true),
                    Estado = table.Column<string>(type: "text", nullable: true),
                    Municipio = table.Column<string>(type: "text", nullable: true),
                    Colonia = table.Column<string>(type: "text", nullable: true),
                    Calle = table.Column<string>(type: "text", nullable: true),
                    NumeroExterior = table.Column<string>(type: "text", nullable: true),
                    NumeroInterior = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Domicilios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Domicilios_Registros_RegistroId",
                        column: x => x.RegistroId,
                        principalTable: "Registros",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Archivos_RegistroId",
                table: "Archivos",
                column: "RegistroId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DatosEconomicos_RegistroId",
                table: "DatosEconomicos",
                column: "RegistroId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DatosPersonales_RegistroId",
                table: "DatosPersonales",
                column: "RegistroId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Domicilios_RegistroId",
                table: "Domicilios",
                column: "RegistroId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Archivos");

            migrationBuilder.DropTable(
                name: "DatosEconomicos");

            migrationBuilder.DropTable(
                name: "DatosPersonales");

            migrationBuilder.DropTable(
                name: "Domicilios");

            migrationBuilder.DropTable(
                name: "Registros");
        }
    }
}
