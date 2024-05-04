using System.ComponentModel.DataAnnotations;

namespace APILogin.Models.Enum
{
    public enum Perfil
    {
        [Display(Name = "Administrador")]
        Administrador,
        [Display(Name = "Locador")]
        Locador,
        [Display(Name = "Inquilino")]
        Inquilino

    }
}
