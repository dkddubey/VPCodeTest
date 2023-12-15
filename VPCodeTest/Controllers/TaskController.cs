using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VPCodeTest.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VPCodeTest.Controllers
{
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly DeepakContext _dbContext;
        public TaskController(DeepakContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/values
        [HttpGet("GetTasks")]
        public IActionResult GetTasks()
        {
            var tasks = _dbContext.Tasks.ToList();

            return Ok(tasks);
        }

        // GET api/values/5
        [HttpGet("GetTask/{id}")]
        public IActionResult GetTask(int id)
        {
            var task = _dbContext.Tasks.AsEnumerable().FirstOrDefault(x => x.Id == id);

            return Ok(task);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var taskToRemove = _dbContext.Tasks.FirstOrDefault(x => x.Id == id);
            if(taskToRemove!=null)
            {
                _dbContext.Tasks.Remove(taskToRemove);
            }
        }
    }
}

