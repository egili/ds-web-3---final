using System.ComponentModel.DataAnnotations;

namespace ProjetoEscola_API.Models
{
    public class Produto
    {
        public int id { get; set; }
        public int valor {get; set; }
        public string? marca { get; set; }
        public string? modelo { get; set; }
    }
}