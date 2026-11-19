using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.API.Data;
using ProductManagementSystem.API.DTOs;
using ProductManagementSystem.API.Models;

//Namespace and route
namespace ProductManagementSystem.API.Controllers;=
[ApiController]
[Route("api/products")]     //  /api/products
public class ProductsController : ControllerBase  //
{
    //Database context and constructor
    private readonly ApplicationDbContext _dbContext;
    
    public ProductsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    //Get all products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        var products = await _dbContext.Products
            .AsNoTracking()
            .OrderBy(product => product.ProductId)
            .ToListAsync();

        return Ok(products);
    }

    //Get one product
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _dbContext.Products
            .AsNoTracking()
            .FirstOrDefaultAsync(product => product.ProductId == id);

        if (product is null)
        {
            return NotFound(new { message = $"Product {id} was not found." });
        }

        return Ok(product);
    }

    //Create a product
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(
        ProductCreateDto request)
    {
        var product = new Product
        {
            ProductName = request.ProductName.Trim(),
            Category = request.Category,
            Price = request.Price,
            StockQuantity = request.StockQuantity
        };

        _dbContext.Products.Add(product);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetProduct),
            new { id = product.ProductId },
            product);
    }

    //Update a product
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(
        int id,
        ProductUpdateDto request)
    {
        var product = await _dbContext.Products.FindAsync(id);

        if (product is null)
        {
            return NotFound(new { message = $"Product {id} was not found." });
        }

        product.ProductName = request.ProductName.Trim();
        product.Category = request.Category;
        product.Price = request.Price;
        product.StockQuantity = request.StockQuantity;

        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    //Delete a product
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _dbContext.Products.FindAsync(id);

        if (product is null)
        {
            return NotFound(new { message = $"Product {id} was not found." });
        }

        _dbContext.Products.Remove(product);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
}