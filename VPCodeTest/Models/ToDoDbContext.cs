using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace VPCodeTest.Models
{
    //public class ToDoDbContext : DbContext
    //{
    //    public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options)
    //    {
    //    }
    //    public DbSet<ToDo> ToDos { get; set; }
    //}

    public interface IToDoDbContext
    {
        DbSet<ToDo> ToDos { get; set; }

        Task<List<T>> ToListAsync<T>(IQueryable<T> queryable);
        Task<int> SaveChangesAsync();
        EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        // Add other members you want to use or mock in your application
    }

    public class ToDoDbContext : DbContext, IToDoDbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options)
        {
        }

        public DbSet<ToDo> ToDos { get; set; }

        public Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }

        EntityEntry<TEntity> IToDoDbContext.Entry<TEntity>(TEntity entity)
        {
            return base.Entry(entity);
        }

        public async Task<List<T>> ToListAsync<T>(IQueryable<T> queryable)
        {
            return await queryable.ToListAsync();
        }
    }
}

