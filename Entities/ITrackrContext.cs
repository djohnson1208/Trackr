using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public interface ITrackrContext
    {
        Task<IEnumerable<Tasks>> GetAllTasks();
        Task<Tasks> GetTaskById(int taskId);
        Task<Tasks> CreateTask(Tasks task);
        Task<Tasks> UpdateTask(Tasks task);
        Task<Tasks> DeleteTask(int taskId);
    }
}
