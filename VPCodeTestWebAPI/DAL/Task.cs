using System;
using System.Collections.Generic;

namespace VPCodeTestWebAPI.DAL
{
    public partial class Task
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime Deadline { get; set; }
    }
}
