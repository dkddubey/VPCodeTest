
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VPCodeTest.Models;


namespace VPCodeTest.Controllers
{
    [Route("api/[controller]")]
    public class ToDoController : Controller
    {
        private readonly IToDoDbContext _toDoContext;
        public ToDoController(IToDoDbContext toDoContext)
        {
            _toDoContext = toDoContext;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDo>>> Get()
        {
            if (_toDoContext.ToDos == null)
            {
                return NotFound();
            }
            var result = await _toDoContext.ToDos.ToListAsync();
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDo>> Get(int id)
        {
            if (_toDoContext.ToDos == null)
            {
                return NotFound();
            }
            var toDo = await _toDoContext.ToDos.FindAsync(id);
            if (toDo == null)
            {
                return NotFound();
            }
            return toDo;
        }

        [HttpPost]
        public async Task<ActionResult<ToDo>> Post([FromBody] ToDo toDo)
        {
            _toDoContext.ToDos.Add(toDo);
            await _toDoContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = toDo.Id }, toDo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ToDo toDo)
        {
            if (id != toDo.Id)
            {
                return BadRequest();
            }
            _toDoContext.ToDos.Entry(toDo).State = EntityState.Modified;
            try
            {
                await _toDoContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_toDoContext.ToDos == null)
            {
                return NotFound();
            }

            var todo = await _toDoContext.ToDos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _toDoContext.ToDos.Remove(todo);
            await _toDoContext.SaveChangesAsync();

            return Ok();
        }

    }
}

