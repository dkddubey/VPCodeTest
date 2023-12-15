﻿using System;
using Microsoft.EntityFrameworkCore;

namespace VPCodeTestWebAPI.Models
{
	public class ToDoContext:DbContext
	{
		public ToDoContext(DbContextOptions<ToDoContext> options):base(options)
		{
		}
		public DbSet<ToDo> ToDos { get; set; }
	}
}
