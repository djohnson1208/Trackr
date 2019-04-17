using System;
using System.Collections.Generic;

namespace Entities
{
    public partial class Tasks
    {
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public bool TaskComplete { get; set; }
    }
}
