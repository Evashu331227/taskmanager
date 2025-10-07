package com.evashu.taskmanager.repository;

import com.evashu.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Find tasks by completion status
    List<Task> findByCompleted(boolean completed);

    // Find tasks by priority
    List<Task> findByPriority(String priority);

    // Find tasks by due date
    List<Task> findByDueDate(LocalDate dueDate);

    // Find tasks due before a specific date
    List<Task> findByDueDateBefore(LocalDate date);

    // Find tasks due after a specific date
    List<Task> findByDueDateAfter(LocalDate date);
}
