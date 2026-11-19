using System.ComponentModel.DataAnnotations;

//Namespace and class
namespace ProductManagementSystem.API.DTOs;
public class ProductCreateDto
{
    //Product name
    [Required(ErrorMessage = "Product name is required.")]
    [StringLength(100)]
    [RegularExpression(@".*\S.*",
        ErrorMessage = "Product name cannot be empty or whitespace.")]
    public string ProductName { get; set; } = string.Empty;

    //Category
    [Required(ErrorMessage = "Category is required.")]
    [RegularExpression(
        "^(Electronics|Grocery|Clothing|Other)$",
        ErrorMessage = "Choose Electronics, Grocery, Clothing, or Other.")]
    public string Category { get; set; } = string.Empty;

    //Price
    [Range(typeof(decimal), "0.01", "99999999.99",
        ErrorMessage = "Price must be greater than 0.")]
    public decimal Price { get; set; }

    //Stock quantity
    [Range(0, int.MaxValue,
        ErrorMessage = "Stock quantity cannot be negative.")]
    public int StockQuantity { get; set; }
}