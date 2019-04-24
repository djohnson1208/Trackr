using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Web.Controllers
{
    public class TaskController : Controller
    {
        private readonly ITrackrContext _context;

        public TaskController(ITrackrContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<string> GetTasks()
        {
            var result = _context.GetDeleteAllTasks();
            var output = JsonConvert.SerializeObject(result.Result);
            return output;
        }

        [HttpGet("api/{controller}/{action}/{taskId}")]
        public ActionResult<string> GetTask(int taskId)
        {
            var result = _context.GetTaskById(taskId);
            var output = JsonConvert.SerializeObject(result.Result);
            return output;
        }

        [HttpPut]
        public async Task<ActionResult<Tasks>> UpdateTask([FromBody]string taskData)
        {
            Stream req = Request.Body;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            var request = JsonConvert.DeserializeObject<Tasks>(
                new StreamReader(req).ReadToEnd());
            return await _context.UpdateTask(request);
        }

        [HttpPost]
        public async Task<ActionResult<Tasks>> CreateTask([FromBody]string taskData)
        {
            Stream req = Request.Body;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            var request = JsonConvert.DeserializeObject<Tasks>(
                new StreamReader(req).ReadToEnd());
            return await _context.CreateTask(request);
        }

        [HttpDelete]
        public async Task<ActionResult<Tasks>> DeleteTask([FromBody]string taskData)
        {
            Stream req = Request.Body;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            var request = JsonConvert.DeserializeObject<Tasks>(
                new StreamReader(req).ReadToEnd());
            return await _context.DeleteTask(request.TaskId);
        }

        [HttpDelete]
        public async Task<ActionResult<string>> DeleteMatchingTasks([FromBody] string taskData)
        {
            Stream req = Request.Body;
            req.Seek(0, System.IO.SeekOrigin.Begin);
            var request = JsonConvert.DeserializeObject<IList<Tasks>>(
                new StreamReader(req).ReadToEnd()).ToList<Tasks>();
            var output = await _context.DeleteMatchingTasks(request);
            return JsonConvert.SerializeObject(output);
        }
    }
}