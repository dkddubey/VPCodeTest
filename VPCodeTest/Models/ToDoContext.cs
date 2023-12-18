using System;
using Microsoft.EntityFrameworkCore;

namespace VPCodeTest.Models
{
	public class ToDoContext:DbContext
	{
		public ToDoContext(DbContextOptions<ToDoContext> options):base(options)
		{
		}
		public DbSet<ToDo> ToDos { get; set; }
	}
}

