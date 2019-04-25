CREATE TABLE [dbo].[tasks] (
    [task_id]          INT            NOT NULL,
    [task_name]        NVARCHAR (256) NOT NULL,
    [task_description] NVARCHAR (MAX) NULL,
    [task_complete]    BIT            NOT NULL,
    CONSTRAINT [PK_dbo.tasks] PRIMARY KEY CLUSTERED ([task_id] ASC)
);

