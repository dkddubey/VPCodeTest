using System;
namespace VPCodeTestWebAPI.Models
{
	public class ToDo
	{
        public int Id { get; set; }
        public string TaskName { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime Deadline { get; set; }
    }
}

