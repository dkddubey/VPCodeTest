using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using VPCodeTest.Controllers;
using VPCodeTest.Models;
using Xunit;

public class ToDoControllerTests
{
    //Mock<IToDoDbContext> mockDbContext = new Mock<IToDoDbContext>();

    [Fact]
    public async Task Get_ReturnsListOfToDos()
    {

        // Arrange
        var mockToDoDbContext = new Mock<IToDoDbContext>();
        var controller = new ToDoController(mockToDoDbContext.Object);

        var toDos = new List<ToDo>
        {
            new ToDo { Id = 1, TaskName = "Task 1", Deadline = DateTime.Today, IsCompleted = false },
            new ToDo { Id = 2, TaskName = "Task 2", Deadline = DateTime.Today, IsCompleted = false },
            new ToDo { Id = 3, TaskName = "Task 3", Deadline = DateTime.Today, IsCompleted = false },
        };

        mockToDoDbContext.Setup<DbSet<ToDo>>(c => c.ToDos).ReturnsDbSet(toDos.AsQueryable());

        // Act
        var result = await controller.Get();

        // Assert
        var actionResult = Assert.IsType<ActionResult<IEnumerable<ToDo>>>(result);
        var model = Assert.IsAssignableFrom<IEnumerable<ToDo>>(actionResult.Value);
        Assert.Equal(3, model.Count());
    }


    [Fact]
    public async Task Get_ReturnsNotFound_WhenToDosIsNull()
    {
        // Arrange
        var mockToDoContext = new Mock<IToDoDbContext>();
        mockToDoContext.SetupGet(c => c.ToDos).Returns((DbSet<ToDo>)null);
        var controller = new ToDoController(mockToDoContext.Object);

        // Act
        var result = await controller.Get();

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }


    [Fact]
    public async Task Get_ReturnsNotFound_WhenToDoNotFound()
    {
        // Arrange
        var mockToDoContext = GetMockToDoContext();
        var controller = new ToDoController(mockToDoContext.Object);

        // Act
        var result = await controller.Get(99); // Assuming ToDo with ID 99 does not exist

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }


    [Fact]
    public async Task Get_ReturnsToDoById()
    {
        // Arrange
        var mockToDoContext = GetMockToDoContext();
        var controller = new ToDoController(mockToDoContext.Object);

        // Act
        var result = await controller.Get(1);

        // Assert
        var actionResult = Assert.IsType<ActionResult<ToDo>>(result);
        var model = Assert.IsAssignableFrom<ToDo>(actionResult.Value);
        Assert.Equal(1, model.Id);
    }

    [Fact]
    public async Task Post_CreatesToDoAndReturnsCreatedAtAction()
    {
        // Arrange
        var mockToDoContext = GetMockToDoContext();
        var controller = new ToDoController(mockToDoContext.Object);
        var newToDo = new ToDo { Id = 4, TaskName = "Task 4", Deadline = DateTime.Today, IsCompleted = false };

        // Act
        var result = await controller.Post(newToDo);

        // Assert
        var actionResult = Assert.IsType<CreatedAtActionResult>(result);
        var model = Assert.IsAssignableFrom<ToDo>(actionResult.Value);
        Assert.Equal(4, model.Id);
    }

    [Fact]
    public async Task Put_UpdatesToDoAndReturnsOk()
    {
        // Arrange
        var mockToDoContext = GetMockToDoContext();
        var controller = new ToDoController(mockToDoContext.Object);
        var existingToDo = new ToDo { Id = 1, TaskName = "Updated task 1", Deadline = DateTime.Today, IsCompleted = true };

        // Act
        var result = await controller.Put(1, existingToDo);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task Put_ReturnsBadRequest_WhenIdMismatch()
    {
        // Arrange
        var mockToDoContext = GetMockToDoContext();
        var controller = new ToDoController(mockToDoContext.Object);
        var existingToDo = new ToDo { Id = 1, TaskName = "Updated task 1", Deadline = DateTime.Today, IsCompleted = true };

        // Act
        var result = await controller.Put(99, existingToDo); // Assuming mismatched ID

        // Assert
        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async Task Delete_RemovesToDoAndReturnsOk()
    {
        // Arrange
        var mockToDoContext = GetMockToDoContext();
        var controller = new ToDoController(mockToDoContext.Object);

        // Act
        var result = await controller.Delete(1);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task Delete_ReturnsNotFound_WhenToDoIsNull()
    {
        // Arrange
        var mockToDoContext = new Mock<IToDoDbContext>();
        mockToDoContext.Setup(c => c.ToDos.FindAsync(99)).ReturnsAsync((ToDo)null); // Assuming ToDo with ID 99 does not exist
        var controller = new ToDoController(mockToDoContext.Object);

        // Act
        var result = await controller.Delete(99);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    private static Mock<IToDoDbContext> GetMockToDoContext()
    {
        var toDos = new List<ToDo>
        {
            new ToDo { Id = 1, TaskName = "Task 1", Deadline = DateTime.Today, IsCompleted = false },
            new ToDo { Id = 2, TaskName = "Task 2", Deadline = DateTime.Today, IsCompleted = false },
            new ToDo { Id = 3, TaskName = "Task 3", Deadline = DateTime.Today, IsCompleted = false },
        }.AsQueryable();

        var mockDbSet = new Mock<DbSet<ToDo>>();
        mockDbSet.As<IQueryable<ToDo>>().Setup(m => m.Provider).Returns(toDos.Provider);
        mockDbSet.As<IQueryable<ToDo>>().Setup(m => m.Expression).Returns(toDos.Expression);
        mockDbSet.As<IQueryable<ToDo>>().Setup(m => m.ElementType).Returns(toDos.ElementType);
        mockDbSet.As<IQueryable<ToDo>>().Setup(m => m.GetEnumerator()).Returns(toDos.GetEnumerator());

        var mockToDoContext = new Mock<IToDoDbContext>();
        mockToDoContext.SetupGet(c => c.ToDos).Returns(mockDbSet.Object);

        return mockToDoContext;
    }

}
