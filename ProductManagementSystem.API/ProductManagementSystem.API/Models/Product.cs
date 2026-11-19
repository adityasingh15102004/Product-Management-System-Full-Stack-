using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProductManagementSystem.API.Models;

//Product category list
public static class ProductCategories
{
    public static readonly string[] All =
        ["Electronics", "Grocery", "Clothing", "Other"];
}

public class Product
{
    public int ProductId { get; set; }

    [Required(ErrorMessage = "Product name is required.")]
    [StringLength(100)]
    [RegularExpression(@".*\S.*", ErrorMessage = "Product name cannot be empty or whitespace.")]
    public string ProductName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Category is required.")]
    [StringLength(50)]
    [RegularExpression("^(Electronics|Grocery|Clothing|Other)$", ErrorMessage = "Choose Electronics, Grocery, Clothing, or Other.")]
    public string Category { get; set; } = string.Empty;

    [Range(typeof(decimal), "0.01", "99999999.99", ErrorMessage = "Price must be greater than 0.")]
    [Column(TypeName = "decimal(10,2)")]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Stock quantity cannot be negative.")]
    public int StockQuantity { get; set; }
}
