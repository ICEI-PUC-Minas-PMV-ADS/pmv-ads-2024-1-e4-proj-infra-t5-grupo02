using System.ComponentModel.DataAnnotations;

namespace APILogin.Models.Enum
{
    public enum Perfil
    {
        [Display(Name = "Administrador")]
        Administrador,
        [Display(Name = "Usuario")]
        Usuario,
        [Display(Name = "Locador")]
        Locador

    }
}
