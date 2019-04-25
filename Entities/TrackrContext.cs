using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Entities
{
    public partial class TrackrContext : DbContext, ITrackrContext
    {
        public TrackrContext()
        {
        }

        public TrackrContext(DbContextOptions<TrackrContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Tasks> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=Trackr;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.4-servicing-10062");

            modelBuilder.Entity<Tasks>(entity =>
            {
                entity.HasKey(e => e.TaskId)
                    .HasName("PK_dbo.tasks");

                entity.ToTable("tasks");

                entity.Property(e => e.TaskId)
                    .HasColumnName("task_id")
                    .ValueGeneratedNever();

                entity.Property(e => e.TaskComplete).HasColumnName("task_complete");

                entity.Property(e => e.TaskDescription).HasColumnName("task_description");

                entity.Property(e => e.TaskName)
                    .IsRequired()
                    .HasColumnName("task_name")
                    .HasMaxLength(256);
            });
        }

        public async Task<IEnumerable<Tasks>> GetAllTasks()
        {
            using (var context = new TrackrContext())
            {
                try
                {
                    return await (from x in this.Tasks
                                  select x).ToListAsync<Tasks>();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }
            }
        }

        public async Task<Tasks> GetTaskById(int taskId)
        {
            using (var context = new TrackrContext()) { 
                try
                {
                    return await (from x in this.Tasks
                                  where x.TaskId == taskId
                                  select x).SingleOrDefaultAsync<Tasks>();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }
            }
        }

        public async Task<Tasks> CreateTask(Tasks task)
        {
            using (var context = new TrackrContext())
            {
                try {
                    var result = await (from x in this.Tasks
                                  where x.TaskId == task.TaskId
                                  select x).SingleOrDefaultAsync<Tasks>();
                    if (result != null)
                    {
                        return null;
                    }
                    await context.Tasks.AddAsync(task);
                    await context.SaveChangesAsync();
                    return task;
                } catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }
            }
        }

        public async Task<Tasks> UpdateTask(Tasks task)
        {
            using (var context = new TrackrContext())
            {
                try
                {
                    var result = await context.Tasks.SingleOrDefaultAsync<Tasks>(x => x.TaskId == task.TaskId);
                    if (result != null)
                    {
                        context.Entry(result).CurrentValues.SetValues(task);
                        await context.SaveChangesAsync();
                    }
                    return result;
                } catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }
            }
        }

        public async Task<Tasks> DeleteTask(int taskId)
        {
            using (var context = new TrackrContext())
            {
                try
                {
                    var result = await context.Tasks.SingleOrDefaultAsync<Tasks>(x => x.TaskId == taskId);
                    if (result != null)
                    {
                        context.Tasks.Remove(result);
                        await context.SaveChangesAsync();
                    }
                    return result;
                } catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }
            }
        }

        public async Task<IEnumerable<Tasks>> DeleteMatchingTasks(List<Tasks> tasksToDelete)
        {
            using (var context = new TrackrContext())
            {
                try
                {
                    var result = (from a in this.Tasks
                                  join b in tasksToDelete on a.TaskId equals b.TaskId
                                  select a);
                    var resultList = await result.ToListAsync<Tasks>();
                    if (result != null)
                    {
                        context.Tasks.RemoveRange(result);
                        await context.SaveChangesAsync();
                    }
                    return resultList;
                } catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return null;
                }
            }
        }
    }
}
