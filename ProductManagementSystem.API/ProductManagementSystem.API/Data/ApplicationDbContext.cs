using Microsoft.EntityFrameworkCore;
using ProductManagementSystem.API.Models;

//Namespace and context class
namespace ProductManagementSystem.API.Data;
public class ApplicationDbContext : DbContext
{
    //Constructor - DI
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    //Products collection
    public DbSet<Product> Products => Set<Product>();

    //Configure the model
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //Configure the Product entity
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(product => product.ProductId);

            entity.Property(product => product.ProductId)
                .UseIdentityColumn();

            entity.Property(product => product.ProductName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(product => product.Category)
                .HasMaxLength(50)
                .IsRequired();

            entity.Property(product => product.Price)
                .HasColumnType("decimal(10,2)")
                .IsRequired();

            entity.Property(product => product.StockQuantity)
                .IsRequired();

            entity.HasData(
                new Product
                {
                    ProductId = 1,
                    ProductName = "Laptop",
                    Category = "Electronics",
                    Price = 55000m,
                    StockQuantity = 10
                },
                new Product
                {
                    ProductId = 2,
                    ProductName = "Keyboard",
                    Category = "Electronics",
                    Price = 1500m,
                    StockQuantity = 3
                },
                new Product
                {
                    ProductId = 3,
                    ProductName = "Rice Bag",
                    Category = "Grocery",
                    Price = 900m,
                    StockQuantity = 20
                },
                new Product
                {
                    ProductId = 4,
                    ProductName = "T-Shirt",
                    Category = "Clothing",
                    Price = 799m,
                    StockQuantity = 7
                },
                new Product
                {
                    ProductId = 5,
                    ProductName = "Notebook",
                    Category = "Other",
                    Price = 75m,
                    StockQuantity = 2
                });


        });
    }
}